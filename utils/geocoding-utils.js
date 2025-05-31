/**
 * 네이버 지도 API의 Geocoder 모듈을 사용하여 주소와 좌표 변환 기능을 제공하는 유틸리티
 */

/**
 * 주소를 좌표로 변환 (Geocoding)
 * @param {string} address - 변환할 주소
 * @returns {Promise<{x: number, y: number, roadAddress: string, jibunAddress: string}>}
 */
export function addressToCoords(address) {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
      reject(new Error("Naver Maps API가 로드되지 않았습니다."))
      return
    }

    window.naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject(new Error(`Geocoding 실패: ${response.v2.errorMessage || "알 수 없는 오류"}`))
          return
        }

        const result = response.v2
        const items = result.addresses

        if (items.length === 0) {
          reject(new Error("검색 결과가 없습니다."))
          return
        }

        const firstItem = items[0]
        resolve({
          x: Number.parseFloat(firstItem.x),
          y: Number.parseFloat(firstItem.y),
          roadAddress: firstItem.roadAddress,
          jibunAddress: firstItem.jibunAddress,
        })
      },
    )
  })
}

/**
 * 좌표를 주소로 변환 (Reverse Geocoding)
 * @param {number} lng - 경도
 * @param {number} lat - 위도
 * @returns {Promise<{roadAddress: string, jibunAddress: string}>}
 */
export function coordsToAddress(lng, lat) {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
      reject(new Error("Naver Maps API가 로드되지 않았습니다."))
      return
    }

    window.naver.maps.Service.reverseGeocode(
      {
        coords: new window.naver.maps.LatLng(lat, lng),
      },
      (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject(new Error("Reverse Geocoding 실패"))
          return
        }

        const result = response.v2
        const address = result.address

        resolve({
          roadAddress: address.roadAddress,
          jibunAddress: address.jibunAddress,
        })
      },
    )
  })
}

/**
 * 현재 위치를 가져와 주소로 변환
 * @returns {Promise<{coords: {lat: number, lng: number}, address: {roadAddress: string, jibunAddress: string}}>}
 */
export async function getCurrentLocationAddress() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("이 브라우저는 위치 정보를 지원하지 않습니다."))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const address = await coordsToAddress(lng, lat)

          resolve({
            coords: { lat, lng },
            address,
          })
        } catch (error) {
          reject(error)
        }
      },
      (error) => {
        let errorMessage = "위치 정보를 가져오는데 실패했습니다."

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 정보 접근 권한이 거부되었습니다."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다."
            break
          case error.TIMEOUT:
            errorMessage = "위치 정보 요청 시간이 초과되었습니다."
            break
        }

        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  })
}

/**
 * 두 좌표 간의 거리 계산 (Haversine 공식)
 * @param {number} lat1 - 첫 번째 위치의 위도
 * @param {number} lng1 - 첫 번째 위치의 경도
 * @param {number} lat2 - 두 번째 위치의 위도
 * @param {number} lng2 - 두 번째 위치의 경도
 * @returns {number} - 미터 단위의 거리
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000 // 지구 반경 (미터)
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

/**
 * 도(degree)를 라디안(radian)으로 변환
 * @param {number} degree - 변환할 각도
 * @returns {number} - 라디안 값
 */
function toRad(degree) {
  return (degree * Math.PI) / 180
}

/**
 * 거리를 사람이 읽기 쉬운 형태로 변환
 * @param {number} meters - 미터 단위의 거리
 * @returns {string} - 포맷된 거리 문자열
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  } else {
    return `${(meters / 1000).toFixed(1)}km`
  }
}
