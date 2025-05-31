// 주요 도시 및 지역의 좌표와 주소 매핑
// 네이버 API가 실패할 경우 대략적인 위치 정보를 제공하기 위한 폴백 데이터
export const fallbackAddresses = [
  {
    // 서울 시청
    lat: 37.5666805,
    lng: 126.9784147,
    address: "서울특별시 중구 세종대로 110",
  },
  {
    // 부산 시청
    lat: 35.1798159,
    lng: 129.0750222,
    address: "부산광역시 연제구 중앙대로 1001",
  },
  {
    // 대구 시청
    lat: 35.8714354,
    lng: 128.601445,
    address: "대구광역시 중구 공평로 88",
  },
  {
    // 인천 시청
    lat: 37.4562557,
    lng: 126.7052062,
    address: "인천광역시 남동구 정각로 29",
  },
  {
    // 광주 시청
    lat: 35.1595454,
    lng: 126.8526012,
    address: "광주광역시 서구 내방로 111",
  },
  {
    // 대전 시청
    lat: 36.3504119,
    lng: 127.3845475,
    address: "대전광역시 서구 둔산로 100",
  },
  {
    // 울산 시청
    lat: 35.5383773,
    lng: 129.3113596,
    address: "울산광역시 남구 중앙로 201",
  },
  {
    // 세종 시청
    lat: 36.4800984,
    lng: 127.2890354,
    address: "세종특별자치시 한누리대로 2130",
  },
  {
    // 경기도청
    lat: 37.2750152,
    lng: 127.0087287,
    address: "경기도 수원시 팔달구 효원로 1",
  },
  {
    // 강원도청
    lat: 37.8228,
    lng: 127.7894,
    address: "강원특별자치도 춘천시 중앙로 1",
  },
]

/**
 * 좌표에 가장 가까운 폴백 주소를 찾는 함수
 * @param {number} lat - 위도
 * @param {number} lng - 경도
 * @returns {string} - 가장 가까운 지역의 대략적인 주소
 */
export function findNearestFallbackAddress(lat, lng) {
  if (!lat || !lng) return "주소 정보를 찾을 수 없습니다"

  // 가장 가까운 지점 찾기
  let minDistance = Number.POSITIVE_INFINITY
  let nearestAddress = null

  for (const location of fallbackAddresses) {
    // 간단한 유클리드 거리 계산 (정확한 거리 계산은 아니지만 비교 목적으로는 충분)
    const distance = Math.sqrt(Math.pow(lat - location.lat, 2) + Math.pow(lng - location.lng, 2))

    if (distance < minDistance) {
      minDistance = distance
      nearestAddress = location.address
    }
  }

  // 가장 가까운 주소 반환 (대략적인 위치 표시)
  return nearestAddress ? `${nearestAddress} 부근` : "주소 정보를 찾을 수 없습니다"
}
