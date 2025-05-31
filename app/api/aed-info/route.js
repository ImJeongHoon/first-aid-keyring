import { NextResponse } from "next/server"

// 안전지도 포털 API 키 (서버 측에서만 사용)
// NEXT_PUBLIC_ 접두사 없이 환경 변수 사용
const AED_SERVICE_KEY = process.env.NMC_AED_SERVICE_KEY

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const radius = searchParams.get("radius") || 1000 // 기본값 1km

  try {
    // API 키가 없는 경우 목업 데이터 반환
    if (!AED_SERVICE_KEY) {
      console.warn("AED Service Key not found, using mock data")
      // 목업 데이터 생성
      const mockData = [
        {
          lat: Number(lat) + 0.002,
          lon: Number(lon) + 0.003,
          buildPlace: "강남역 2번 출구",
          workTime: "24시간",
          tel: "02-123-4567",
        },
        {
          lat: Number(lat) - 0.001,
          lon: Number(lon) + 0.002,
          buildPlace: "서울시청",
          workTime: "09:00-18:00",
          tel: "02-2133-1111",
        },
        {
          lat: Number(lat) + 0.003,
          lon: Number(lon) - 0.001,
          buildPlace: "종로구청",
          workTime: "09:00-18:00",
          tel: "02-2148-1111",
        },
      ]
      return NextResponse.json({ items: mockData })
    }

    // 실제 API 호출
    const url = `https://apis.data.go.kr/B552657/AEDInfoInqireService/getAedLcinfoInqire?serviceKey=${AED_SERVICE_KEY}&WGS84_LON=${lon}&WGS84_LAT=${lat}&radius=${radius}&numOfRows=300&pageNo=1`

    const response = await fetch(url)
    const xmlText = await response.text()

    // XML 응답을 JSON으로 변환하여 클라이언트에 전달
    return NextResponse.json({
      xmlData: xmlText,
    })
  } catch (error) {
    console.error("Error fetching AED data:", error)
    return NextResponse.json({ error: "Failed to fetch AED data" }, { status: 500 })
  }
}
