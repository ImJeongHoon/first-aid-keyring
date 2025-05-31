import { NextResponse } from "next/server"

// 샘플 AED 위치 데이터
const aedLocations = [
  {
    id: 1,
    name: "서울역 1번 출구",
    address: "서울특별시 중구 한강대로 405",
    coordinates: { lat: 37.5559, lng: 126.9723 },
    isAvailable: true,
    lastChecked: "2023-12-15",
    indoorLocation: "1층 안내데스크 옆",
    distance: null,
  },
  {
    id: 2,
    name: "강남역 2번 출구",
    address: "서울특별시 강남구 강남대로 396",
    coordinates: { lat: 37.4982, lng: 127.0276 },
    isAvailable: true,
    lastChecked: "2023-12-10",
    indoorLocation: "지하 1층 개찰구 옆",
    distance: null,
  },
  {
    id: 3,
    name: "홍대입구역 9번 출구",
    address: "서울특별시 마포구 양화로 지하 160",
    coordinates: { lat: 37.5575, lng: 126.9245 },
    isAvailable: true,
    lastChecked: "2023-12-05",
    indoorLocation: "지하 2층 화장실 앞",
    distance: null,
  },
  {
    id: 4,
    name: "여의도 IFC몰",
    address: "서울특별시 영등포구 국제금융로 10",
    coordinates: { lat: 37.5251, lng: 126.9255 },
    isAvailable: true,
    lastChecked: "2023-12-01",
    indoorLocation: "3층 푸드코트 입구",
    distance: null,
  },
  {
    id: 5,
    name: "명동 롯데백화점",
    address: "서울특별시 중구 을지로 30",
    coordinates: { lat: 37.5647, lng: 126.9816 },
    isAvailable: true,
    lastChecked: "2023-11-25",
    indoorLocation: "1층 고객센터 옆",
    distance: null,
  },
]

// 두 지점 간의 거리 계산 함수 (Haversine 공식)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // 지구 반경 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  let locations = [...aedLocations]

  // 사용자 위치가 제공된 경우 거리 계산
  if (lat && lng) {
    const userLat = Number.parseFloat(lat)
    const userLng = Number.parseFloat(lng)

    locations = locations
      .map((location) => {
        const distance = calculateDistance(userLat, userLng, location.coordinates.lat, location.coordinates.lng)

        return {
          ...location,
          distance: Number.parseFloat(distance.toFixed(2)),
        }
      })
      .sort((a, b) => (a.distance || Number.POSITIVE_INFINITY) - (b.distance || Number.POSITIVE_INFINITY))
  }

  return NextResponse.json({ locations })
}
