/**
 * 좌표를 주소로 변환하는 함수
 * @param {number} lng - 경도
 * @param {number} lat - 위도
 * @returns {Promise<string>} - 주소 문자열
 */
export async function coordsToAddress(lng, lat) {
  try {
    // 캐시 키 생성 (소수점 5자리까지만 사용하여 비슷한 위치는 같은 주소로 처리)
    const cacheKey = `${Number.parseFloat(lng).toFixed(5)},${Number.parseFloat(lat).toFixed(5)}`

    // 세션 스토리지에서 캐시된 주소 확인
    const cachedAddress = sessionStorage.getItem(`address_${cacheKey}`)
    if (cachedAddress) {
      console.log("캐시된 주소 사용:", cachedAddress)
      return cachedAddress
    }

    console.log(`주소 변환 요청: 경도=${lng}, 위도=${lat}`)

    const response = await fetch(`/api/reverse-geocode?coords=${lng},${lat}`)

    if (!response.ok) {
      throw new Error(`주소 변환 API 오류: ${response.status}`)
    }

    const data = await response.json()
    console.log("역지오코딩 응답:", data)

    // 주소 정보 추출
    let address = "주소 정보를 찾을 수 없습니다"

    if (data.status && data.status.code === 0) {
      const results = data.results || []

      // 지역 정보 찾기 (region)
      const region = results.find((item) => item.name === "region")
      let regionAddress = ""

      if (region && region.region) {
        // 시/도, 시/군/구, 읍/면/동 정보 조합
        const area1 = region.region.area1 ? region.region.area1.name : ""
        const area2 = region.region.area2 ? region.region.area2.name : ""
        const area3 = region.region.area3 ? region.region.area3.name : ""
        const area4 = region.region.area4 ? region.region.area4.name : ""

        regionAddress = [area1, area2, area3, area4].filter(Boolean).join(" ")
      }

      // 도로명 주소 찾기 (land)
      const land = results.find((item) => item.name === "land")
      let roadAddress = ""

      if (land && land.land) {
        const roadName = land.land.name || ""
        const buildingNumber = land.land.number1 || ""
        const buildingName = (land.land.addition0 && land.land.addition0.value) || ""

        if (roadName && buildingNumber) {
          roadAddress = `${roadName} ${buildingNumber}`
          if (buildingName) {
            roadAddress += ` (${buildingName})`
          }
        }
      }

      // 도로명 주소가 있으면 지역+도로명, 없으면 지역만
      if (roadAddress) {
        address = regionAddress ? `${regionAddress} ${roadAddress}` : roadAddress
      } else if (regionAddress) {
        address = regionAddress
      }

      // 주소가 여전히 없는 경우 (네이버 API가 주소를 찾지 못한 경우)
      if (address === "주소 정보를 찾을 수 없습니다" && (regionAddress || roadAddress)) {
        address = regionAddress || roadAddress
      }

      // 캐시에 주소 저장 (30분 동안 유효)
      if (address !== "주소 정보를 찾을 수 없습니다") {
        try {
          sessionStorage.setItem(`address_${cacheKey}`, address)
          // 30분 후 캐시 만료
          setTimeout(
            () => {
              sessionStorage.removeItem(`address_${cacheKey}`)
            },
            30 * 60 * 1000,
          )
        } catch (e) {
          console.warn("세션 스토리지 저장 실패:", e)
        }
      }
    }

    return address
  } catch (error) {
    console.error("주소 변환 오류:", error)

    // 오류 발생 시 기본 메시지 반환
    return "주소 정보를 일시적으로 불러올 수 없습니다"
  }
}

/**
 * 거리 계산 함수 (Haversine 공식)
 * @param {number} lat1 - 첫 번째 위치의 위도
 * @param {number} lng1 - 첫 번째 위치의 경도
 * @param {number} lat2 - 두 번째 위치의 위도
 * @param {number} lng2 - 두 번째 위치의 경도
 * @returns {number} - 미터 단위의 거리
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3 // 지구 반경 (미터)
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d // 미터 단위
}

/**
 * 거리를 사람이 읽기 쉬운 형식으로 변환
 * @param {number} meters - 미터 단위의 거리
 * @returns {string} - 형식화된 거리 문자열
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  } else {
    return `${(meters / 1000).toFixed(1)}km`
  }
}
