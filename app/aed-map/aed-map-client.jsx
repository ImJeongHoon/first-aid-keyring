"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, MapPin, Info, X, ChevronLeft, Phone, Home } from "lucide-react"
import { AEDInfoCard } from "@/components/aed-info-card"
import { AEDGuide } from "@/components/aed-guide"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { calculateDistance } from "@/utils/location-utils"
import Link from "next/link"
import "./map-styles.css"

// 환경 변수 (NEXT_PUBLIC_ 접두사 필수)
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID

export default function AEDMapClient() {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const [markers, setMarkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [aedLocations, setAedLocations] = useState([])
  const [selectedAED, setSelectedAED] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [activeView, setActiveView] = useState("map")
  const [showGuide, setShowGuide] = useState(false)
  const [isLocationTracking, setIsLocationTracking] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const userMarkerRef = useRef(null)
  const watchIdRef = useRef(null)
  const { toast } = useToast()

  /* 1) 네이버 지도 SDK 로드 후 지도 초기화 */
  const handleLoad = () => {
    try {
      console.log("Naver Maps script loaded, initializing map...")
      if (!containerRef.current) return

      setLoading(false)

      mapRef.current = new window.naver.maps.Map(containerRef.current, {
        center: new window.naver.maps.LatLng(-34.397, 150.644), // Updated coordinates
        zoom: 14,
      })

      // 사용자 위치 가져오기 시도
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = new window.naver.maps.LatLng(position.coords.latitude, position.coords.longitude)
            mapRef.current.setCenter(userLocation)
            fetchAndDraw(userLocation)
          },
          () => {
            // 위치 권한이 없는 경우 기본 위치(서울 시청)에서 AED 정보 가져오기
            fetchAndDraw()
          },
        )
      } else {
        // 지오로케이션을 지원하지 않는 브라우저의 경우
        fetchAndDraw()
      }
    } catch (err) {
      console.error("Map initialization error:", err)
      setError("지도를 초기화하는 중 오류가 발생했습니다.")
      setLoading(false)
    }
  }

  /* 2) AED API 호출 → 마커 생성 (서버 API를 통해 호출) */
  const fetchAndDraw = async (center) => {
    try {
      if (!mapRef.current) return

      const lat = center ? center.lat() : mapRef.current.getCenter().lat()
      const lon = center ? center.lng() : mapRef.current.getCenter().lng()
      const radius = 1000 // 1 km

      console.log(`Fetching AED locations at: ${lat}, ${lon} with radius ${radius}m`)

      // 서버 API를 통해 AED 정보 가져오기
      const response = await fetch(`/api/aed-info?lat=${lat}&lon=${lon}&radius=${radius}`)

      if (!response.ok) {
        throw new Error("Failed to fetch AED data from server")
      }

      const data = await response.json()

      let list = []

      if (data.xmlData) {
        // XML 데이터 파싱
        const parser = new DOMParser()
        const xml = parser.parseFromString(data.xmlData, "text/xml")
        const items = Array.from(xml.getElementsByTagName("item"))

        list = items
          .map((el) => {
            const lat = Number.parseFloat(el.querySelector("wgs84Lat")?.textContent ?? "")
            const lon = Number.parseFloat(el.querySelector("wgs84Lon")?.textContent ?? "")
            if (Number.isNaN(lat) || Number.isNaN(lon)) return null // 좌표 없으면 제외
            return {
              lat,
              lon,
              buildPlace: el.querySelector("buildPlace")?.textContent ?? "",
              workTime: el.querySelector("workTime")?.textContent ?? "",
              tel: el.querySelector("clerkTel")?.textContent ?? "",
            }
          })
          .filter(Boolean)
      } else if (data.items) {
        // 목업 데이터 사용
        list = data.items
      }

      // 기존 마커 제거
      markers.forEach((m) => m.setMap(null))

      // 새 마커 생성
      const nextMarkers = list.map((info) => createMarker(info))
      setMarkers(nextMarkers)

      console.log(`Found ${nextMarkers.length} AED locations`)

      // AED 위치 정보를 상태에 저장 (목록 표시용)
      const aedLocationsData = list.map((info, index) => {
        return {
          id: index + 1,
          name: info.buildPlace || `AED 위치 ${index + 1}`,
          coordinates: {
            lat: info.lat,
            lng: info.lon,
          },
          isAvailable: true,
          lastChecked: new Date().toISOString().split("T")[0],
          phoneNumber: info.tel || null,
          manager: info.manager || null,
          distance: null,
        }
      })

      // 거리 계산 및 정렬
      const locationsWithDistance = aedLocationsData
        .map((aed) => ({
          ...aed,
          distance: calculateDistance(lat, lon, aed.coordinates.lat, aed.coordinates.lng),
        }))
        .sort((a, b) => a.distance - b.distance)

      setAedLocations(locationsWithDistance)
    } catch (err) {
      console.error("Error fetching AED data:", err)
      setError("AED 위치 정보를 가져오는 중 오류가 발생했습니다.")
    }
  }

  // 마커 생성 함수
  const createMarker = (info) => {
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(info.lat, info.lon),
      map: mapRef.current,
      icon: {
        content:
          '<div style="width:20px;height:20px;border-radius:50%;background:#e11;box-shadow:0 0 2px #000;"></div>',
      },
    })

    const iw = new window.naver.maps.InfoWindow({
      content: `<div style="padding:8px;max-width:220px;">
        <b>${info.buildPlace}</b><br/>
        연락처: ${info.tel || "정보 없음"}
      </div>`,
    })

    window.naver.maps.Event.addListener(marker, "click", () => {
      iw.open(mapRef.current, marker)
    })

    return marker
  }

  // 현재 위치로 이동
  const moveToCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.")
      return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const userLocation = new window.naver.maps.LatLng(lat, lng)
        mapRef.current.setCenter(userLocation)
        mapRef.current.setZoom(15)
        fetchAndDraw(userLocation)
        setLoading(false)
      },
      (err) => {
        console.error("Geolocation error:", err)
        alert("위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.")
        setLoading(false)
      },
    )
  }

  // 네이버 지도 스크립트 로드 함수
  const loadNaverMapsScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.naver && window.naver.maps) {
        resolve()
        return
      }

      const clientId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID
      if (!clientId) {
        console.error("Naver Maps Client ID is missing")
        reject(new Error("Naver Maps Client ID is not defined"))
        return
      }

      console.log("Loading Naver Maps with Client ID:", clientId)

      // 인증 실패 처리 함수 추가
      window.navermap_authFailure = () => {
        console.error("네이버 지도 API 인증 실패")
        toast({
          title: "지도 로드 실패",
          description: "네이버 지도 API 인증에 실패했습니다. 관리자에게 문의하세요.",
          variant: "destructive",
        })
        reject(new Error("Naver Maps API authentication failed"))
      }

      const script = document.createElement("script")
      script.type = "text/javascript"
      // HTTPS 사용 및 ncpClientId 파라미터명 수정
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`
      script.async = true
      script.onload = () => {
        console.log("Naver Maps script loaded successfully")
        resolve()
      }
      script.onerror = (e) => {
        console.error("Failed to load Naver Maps script:", e)
        reject(new Error("Failed to load Naver Maps script"))
      }

      document.head.appendChild(script)
    })
  }, [toast])

  // 현재 위치를 가져오는 함수
  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"))
        return
      }

      // 위치 정보 요청 전 사용자에게 알림
      toast({
        title: "위치 정보 요청",
        description: "정확한 위치 정보를 위해 권한을 허용해주세요.",
      })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const userLocation = new window.naver.maps.LatLng(lat, lng)
          mapRef.current.setCenter(userLocation)
          mapRef.current.setZoom(15)
          fetchAndDraw(userLocation)
          resolve(position)
        },
        (error) => {
          console.error("Geolocation error:", error)
          if (error.code === error.PERMISSION_DENIED) {
            reject(
              new Error(
                "위치 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 접근을 허용하거나 주소 검색을 이용해주세요.",
              ),
            )
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            reject(new Error("현재 위치를 확인할 수 없습니다. 주소 검색을 이용해주세요."))
          } else if (error.code === error.TIMEOUT) {
            reject(new Error("위치 확인 요청이 시간 초과되었습니다. 다시 시도해주세요."))
          } else {
            reject(new Error("위치 확인 중 오류가 발생했습니다. 주소 검색을 이용해주세요."))
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        },
      )
    })
  }, [toast])

  // 위치 추적 시작
  const startLocationTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
    }

    if (!navigator.geolocation) {
      toast({
        title: "위치 추적 불가",
        description: "브라우저가 위치 추적을 지원하지 않습니다.",
        variant: "destructive",
      })
      return
    }

    setIsLocationTracking(true)
    toast({
      title: "위치 추적 시작",
      description: "실시간으로 위치를 추적합니다.",
    })

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setUserLocation(newLocation)

        if (mapInstanceRef.current) {
          // 사용자 위치 마커 업데이트
          createUserMarker(mapInstanceRef.current, newLocation)

          // 지도 중심 이동
          mapInstanceRef.current.setCenter(new window.naver.maps.LatLng(newLocation.lat, newLocation.lng))

          // AED 위치와의 거리 계산 업데이트
          updateAEDDistances(newLocation)

          // 현재 시간 업데이트
          setLastUpdated(new Date())
        }
      },
      (error) => {
        console.error("Location tracking error:", error)
        setIsLocationTracking(false)
        toast({
          title: "위치 추적 오류",
          description: "위치 추적 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }, [toast])

  // 위치 추적 중지
  const stopLocationTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    setIsLocationTracking(false)
    toast({
      title: "위치 추적 중지",
      description: "위치 추적이 중지되었습니다.",
    })
  }, [toast])

  // AED 위치와의 거리 계산 업데이트
  const updateAEDDistances = useCallback((userLocation) => {
    if (!userLocation) return

    setAedLocations((prevLocations) =>
      prevLocations
        .map((aed) => ({
          ...aed,
          distance: calculateDistance(userLocation.lat, userLocation.lng, aed.coordinates.lat, aed.coordinates.lng),
        }))
        .sort((a, b) => a.distance - b.distance),
    )
  }, [])

  // 마커 아이콘 생성 함수
  const createMarkerIcon = useCallback((isSelected = false) => {
    return {
      content: `
        <div class="marker-container ${isSelected ? "selected" : ""}">
          <div class="marker-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${isSelected ? "#FF3B30" : "#E03131"}" />
            </svg>
          </div>
          ${isSelected ? '<div class="marker-pulse"></div>' : ""}
        </div>
      `,
      size: new window.naver.maps.Size(30, 30),
      anchor: new window.naver.maps.Point(15, 15),
    }
  }, [])

  // 네이버 지도 초기화
  const initializeMap = useCallback(async () => {
    try {
      console.log("Initializing map...")
      // 사용자 위치 가져오기
      let location
      try {
        console.log("Trying to get user location...")
        const position = await getCurrentPosition()
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        console.log("User location obtained:", location)
      } catch (err) {
        console.error("Failed to get user location:", err)
        // 서울 시청을 기본 위치로 설정
        location = { lat: -34.397, lng: 150.644 } // Updated default coordinates
        toast({
          title: "위치 확인 실패",
          description: err.message || "기본 위치(서울시청)를 사용합니다.",
          variant: "destructive",
        })
      }

      setUserLocation(location)

      if (!containerRef.current) return // DOM 요소 체크

      const mapOptions = {
        center: new window.naver.maps.LatLng(location.lat, location.lng),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
          style: window.naver.maps.ZoomControlStyle.SMALL,
        },
        scaleControl: true,
        scaleControlOptions: {
          position: window.naver.maps.Position.BOTTOM_LEFT,
        },
        mapDataControl: false,
        logoControlOptions: {
          position: window.naver.maps.Position.BOTTOM_RIGHT,
        },
      }

      const map = new window.naver.maps.Map(containerRef.current, mapOptions)
      mapInstanceRef.current = map

      // AED 위치 데이터 가져오기
      const locations = await fetchAEDLocations(location.lat, location.lng)

      // 거리 계산 및 정렬
      const locationsWithDistance = locations
        .map((aed) => ({
          ...aed,
          distance: calculateDistance(location.lat, location.lng, aed.coordinates.lat, aed.coordinates.lng),
        }))
        .sort((a, b) => a.distance - b.distance)

      setAedLocations(locationsWithDistance)

      // 마커 생성
      createMarkers(map, locationsWithDistance)

      // 사용자 위치 마커 생성
      createUserMarker(map, location)

      // 현재 시간 설정
      setLastUpdated(new Date())

      setIsLoading(false)
      console.log("Map initialized successfully")
    } catch (err) {
      console.error("Failed to initialize map:", err)
      setError("지도를 불러오는데 실패했습니다. 다시 시도해주세요.")
      setIsLoading(false)
    }
  }, [getCurrentPosition, toast])

  // AED 위치 데이터 가져오기
  const fetchAEDLocations = useCallback(
    async (lat, lng) => {
      try {
        let url = "/api/aed-locations"

        if (lat && lng) {
          url += `?lat=${lat}&lng=${lng}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch AED locations")
        }

        const data = await response.json()
        return data.locations
      } catch (err) {
        console.error("Failed to fetch AED locations:", err)
        toast({
          title: "AED 위치 정보 로드 실패",
          description: "AED 위치 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        })
        return []
      }
    },
    [toast],
  )

  // 마커 생성
  const createMarkers = useCallback(
    (map, locations) => {
      // 기존 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null))
      markersRef.current = []

      // 새 마커 생성
      locations.forEach((location) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
          map,
          icon: createMarkerIcon(selectedAED === location.id),
          zIndex: selectedAED === location.id ? 100 : 50,
        })

        window.naver.maps.Event.addListener(marker, "click", () => {
          setSelectedAED(location.id)

          // 모바일에서는 목록 뷰로 전환
          if (window.innerWidth < 768) {
            setActiveView("list")
          }
        })

        markersRef.current.push(marker)
      })
    },
    [selectedAED, createMarkerIcon],
  )

  // 사용자 위치 마커 생성
  const createUserMarker = useCallback((map, position) => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null)
    }

    userMarkerRef.current = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(position.lat, position.lng),
      map,
      icon: {
        content: `
          <div class="flex items-center justify-center">
            <div class="h-4 w-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
            <div class="absolute h-10 w-10 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
          </div>
        `,
        size: new window.naver.maps.Size(10, 10),
        anchor: new window.naver.maps.Point(5, 5),
      },
      zIndex: 200,
    })
  }, [])

  // 선택된 AED가 변경될 때 마커 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current || aedLocations.length === 0) return

    createMarkers(mapInstanceRef.current, aedLocations)

    // 선택된 AED로 지도 이동
    if (selectedAED) {
      const selected = aedLocations.find((aed) => aed.id === selectedAED)

      if (selected) {
        mapInstanceRef.current.setCenter(
          new window.naver.maps.LatLng(selected.coordinates.lat, selected.coordinates.lng),
        )

        // 선택된 AED 카드로 스크롤
        const element = document.getElementById(`aed-card-${selectedAED}`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
      }
    }
  }, [selectedAED, aedLocations, createMarkers])

  // 현재 위치로 이동
  const handleMoveToCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true)

      // 위치 추적 중이면 중지
      if (isLocationTracking) {
        stopLocationTracking()
      }

      const position = await getCurrentPosition()
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      setUserLocation(location)

      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(new window.naver.maps.LatLng(location.lat, location.lng))

        // 사용자 위치 마커 업데이트
        createUserMarker(mapInstanceRef.current, location)

        // 현재 위치 기준으로 AED 위치 다시 가져오기
        const locations = await fetchAEDLocations(location.lat, location.lng)

        // 거리 계산 및 정렬
        const locationsWithDistance = locations
          .map((aed) => ({
            ...aed,
            distance: calculateDistance(location.lat, location.lng, aed.coordinates.lat, aed.coordinates.lng),
          }))
          .sort((a, b) => a.distance - b.distance)

        setAedLocations(locationsWithDistance)

        // 마커 업데이트
        createMarkers(mapInstanceRef.current, locationsWithDistance)

        // 현재 시간 업데이트
        setLastUpdated(new Date())
      }
    } catch (err) {
      console.error("Failed to move to current location:", err)
      toast({
        title: "위치 이동 실패",
        description: err.message || "현재 위치로 이동하는데 실패했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [
    getCurrentPosition,
    createUserMarker,
    fetchAEDLocations,
    createMarkers,
    isLocationTracking,
    stopLocationTracking,
    toast,
  ])

  // 위치 추적 토글
  const toggleLocationTracking = useCallback(() => {
    if (isLocationTracking) {
      stopLocationTracking()
    } else {
      startLocationTracking()
    }
  }, [isLocationTracking, startLocationTracking, stopLocationTracking])

  // 길 안내 처리
  const handleNavigate = useCallback((lat, lng) => {
    // 네이버 지도 앱으로 길 안내
    const url = `nmap://route/walk?dlat=${lat}&dlng=${lng}&appname=com.firstaidkeyring`

    // 앱이 설치되어 있지 않은 경우를 위한 웹 URL
    const webUrl = `https://map.naver.com/v5/directions/-/-/-/walk?c=${lng},${lat},15,0,0,0,dh`

    // 앱 URL 열기 시도
    setTimeout(() => {
      window.location.href = webUrl
    }, 500)

    window.location.href = url
  }, [])

  // 응급 전화 걸기
  const handleEmergencyCall = useCallback(() => {
    window.location.href = "tel:119"
  }, [])

  useEffect(() => {
    const initMap = async () => {
      setIsLoading(true)
      try {
        console.log("Starting map initialization...")
        await loadNaverMapsScript()
        console.log("Naver Maps script loaded, initializing map...")

        // Call handleLoad directly after script is loaded
        handleLoad()

        await initializeMap()
        console.log("Map initialized successfully")
      } catch (err) {
        console.error("Failed to initialize map:", err)
        setError("지도를 불러오는데 실패했습니다. 다시 시도해주세요.")
        toast({
          title: "지도 로드 실패",
          description: err.message || "지도를 불러오는데 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    initMap()

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null))
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null)
      }
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [loadNaverMapsScript, initializeMap, toast])

  // 마지막 업데이트 시간 포맷팅
  const formatLastUpdated = () => {
    if (!lastUpdated) return null

    return lastUpdated.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-var(--app-bottom-nav-height))]">
      {/* 헤더 */}
      <div className="bg-white p-3 shadow-sm flex items-center justify-between z-10">
        <h1 className="text-lg font-bold">AED 찾기</h1>
        <Link href="/" className="flex items-center text-sm text-gray-600">
          <Home className="h-4 w-4 mr-1" />
          홈으로
        </Link>
      </div>

      {/* AED 사용 가이드 */}
      {showGuide && (
        <div className="guide-overlay">
          <div className="guide-container">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">AED 사용 가이드</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowGuide(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <AEDGuide />
          </div>
        </div>
      )}

      {/* 모바일 탭 뷰 */}
      <div className="md:hidden">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">지도</TabsTrigger>
            <TabsTrigger value="list">목록</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden">
        {/* 지도 영역 */}
        <div className={`relative md:col-span-2 ${activeView === "list" ? "hidden md:block" : "block"}`}>
          {/* 지도 */}
          <div ref={containerRef} className="flex-1 w-full app-map" style={{ minHeight: "calc(100vh - 120px)" }} />

          {/* 현재 위치 버튼 */}
          <div className="control-buttons custom-position">
            <Button
              variant="secondary"
              size="icon"
              className="control-button shadow-md"
              onClick={handleMoveToCurrentLocation}
              disabled={isLoading}
              title="현재 위치로 이동"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="control-button shadow-md mt-2"
              onClick={() => setShowGuide(true)}
              title="AED 사용 가이드"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>

          {/* 응급 전화 버튼 */}
          <Button
            variant="destructive"
            className="emergency-call-button shadow-md"
            onClick={handleEmergencyCall}
            style={{ bottom: "calc(var(--app-bottom-nav-height) + 16px)" }}
          >
            <Phone className="h-5 w-5 mr-2" />
            119 응급 전화
          </Button>

          {/* 마지막 업데이트 시간 */}
          {lastUpdated && (
            <div className="last-updated" style={{ bottom: "calc(var(--app-bottom-nav-height) + 70px)" }}>
              마지막 업데이트: {formatLastUpdated()}
              {isLocationTracking && <span className="ml-2 tracking-pulse">•</span>}
            </div>
          )}

          {/* 로딩 표시 */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          )}

          {/* 오류 메시지 */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => window.location.reload()}
                >
                  새로고침
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AED 목록 영역 */}
        <div
          className={`bg-white ${activeView === "map" ? "hidden md:block" : "block"} overflow-y-auto`}
          style={{ maxHeight: "calc(100vh - var(--app-bottom-nav-height) - 48px)" }}
        >
          <div className="aed-list-container">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">주변 AED 위치</h2>

              {/* 모바일에서 지도로 돌아가기 버튼 */}
              <div className="md:hidden">
                <Button variant="outline" size="sm" onClick={() => setActiveView("map")} className="flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  지도로
                </Button>
              </div>
            </div>

            {/* 위치 추적 상태 표시 */}
            {isLocationTracking && (
              <div className="mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
                  <span className="tracking-pulse mr-2">•</span>
                  실시간 위치 추적 중
                </Badge>
              </div>
            )}

            {aedLocations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">주변에 AED가 없습니다.</p>
                <Button variant="outline" className="mt-4" onClick={handleMoveToCurrentLocation}>
                  <MapPin className="h-4 w-4 mr-2" />
                  현재 위치에서 다시 검색
                </Button>
              </div>
            ) : (
              <div>
                {aedLocations.map((aed) => (
                  <div key={aed.id} id={`aed-card-${aed.id}`} onClick={() => setSelectedAED(aed.id)}>
                    <AEDInfoCard aed={aed} onNavigate={handleNavigate} isSelected={selectedAED === aed.id} />
                  </div>
                ))}
              </div>
            )}

            {/* AED 사용 가이드 버튼 */}
            <div className="mt-6 mb-6 text-center">
              <Button variant="outline" onClick={() => setShowGuide(true)} className="w-full">
                <Info className="h-4 w-4 mr-2" />
                AED 사용 가이드 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
