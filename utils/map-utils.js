// 현재 위치를 가져오는 함수
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  })
}

// 네이버 지도 스크립트 로드 함수
export const loadNaverMapsScript = (ncpClientId) => {
  return new Promise((resolve, reject) => {
    // Check if Naver Maps is already loaded
    if (window.naver && window.naver.maps) {
      console.log("Naver Maps already loaded, using existing instance")
      resolve()
      return
    }

    // Check if script is already in the document but not loaded yet
    const existingScript = document.querySelector('script[src*="map.naver.com"]')
    if (existingScript) {
      console.log("Naver Maps script tag already exists, waiting for it to load")
      existingScript.addEventListener("load", () => {
        console.log("Existing Naver Maps script loaded")
        resolve()
      })
      existingScript.addEventListener("error", () => {
        reject(new Error("Existing Naver Maps script failed to load"))
      })
      return
    }

    console.log("Adding new Naver Maps script to document")
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ncpClientId}&submodules=geocoder`
    script.async = true
    script.onload = () => {
      console.log("New Naver Maps script loaded successfully")
      resolve()
    }
    script.onerror = () => {
      console.error("Failed to load Naver Maps script")
      reject(new Error("Failed to load Naver Maps script"))
    }
    document.head.appendChild(script)
  })
}

// 마커 아이콘 생성 함수
export const createMarkerIcon = (isSelected = false) => {
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
}

// 주소로 좌표 검색 함수
export const searchAddressToCoordinate = (address) => {
  return new Promise((resolve, reject) => {
    window.naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status === window.naver.maps.Service.Status.ERROR) {
        reject(new Error("Something went wrong with geocoding"))
        return
      }

      if (response.v2.meta.totalCount === 0) {
        reject(new Error("No results found"))
        return
      }

      const item = response.v2.addresses[0]
      resolve({
        lat: Number.parseFloat(item.y),
        lng: Number.parseFloat(item.x),
      })
    })
  })
}
