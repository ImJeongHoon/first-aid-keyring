import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const coords = searchParams.get("coords")

  if (!coords) {
    return NextResponse.json({ error: "좌표가 제공되지 않았습니다." }, { status: 400 })
  }

  const [longitude, latitude] = coords.split(",")

  if (!longitude || !latitude) {
    return NextResponse.json({ error: "잘못된 좌표 형식입니다." }, { status: 400 })
  }

  try {
    // 네이버 지도 API 키
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID
    const clientSecret = process.env.NAVER_MAPS_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("네이버 지도 API 키가 설정되지 않았습니다.")
      return NextResponse.json({ error: "API 키 설정 오류" }, { status: 500 })
    }

    console.log(`역지오코딩 요청: 경도=${longitude}, 위도=${latitude}`)

    // 네이버 지도 API 호출
    const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json&orders=roadaddr,addr`

    console.log("API 요청 URL:", url)

    const response = await fetch(url, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": clientSecret,
      },
    })

    if (!response.ok) {
      console.error(`네이버 API 응답 오류: ${response.status} ${response.statusText}`)
      throw new Error(`API 응답 오류: ${response.status}`)
    }

    const data = await response.json()
    console.log("네이버 API 응답:", JSON.stringify(data).substring(0, 500) + "...")

    return NextResponse.json(data)
  } catch (error) {
    console.error("역지오코딩 오류:", error)
    return NextResponse.json({ error: "주소 변환 중 오류가 발생했습니다.", message: error.message }, { status: 500 })
  }
}
