/**
 * 폰트 로딩 최적화를 위한 유틸리티 함수
 */

// 폰트 로딩 상태 감지
export function detectFontLoading() {
  if ("fonts" in document) {
    // 폰트 로딩 완료 감지
    document.fonts.ready.then(() => {
      // 폰트 로딩 완료 시 클래스 추가
      document.documentElement.classList.add("fonts-loaded")

      // 폰트 로딩 완료 이벤트 발생
      const fontLoadedEvent = new CustomEvent("fontsloaded")
      document.dispatchEvent(fontLoadedEvent)

      // 성능 측정 마크 추가
      if (performance && performance.mark) {
        performance.mark("fonts-loaded")
      }
    })
  }
}

// 폰트 프리로딩
export function preloadFonts(fontUrls) {
  if (!fontUrls || !Array.isArray(fontUrls) || fontUrls.length === 0) return

  fontUrls.forEach((url) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = url
    link.as = "font"
    link.type = "font/woff2"
    link.crossOrigin = "anonymous"
    document.head.appendChild(link)
  })
}

// 시스템 폰트 감지
export function detectSystemFonts() {
  const koreanFonts = [
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "맑은 고딕",
    "Nanum Gothic",
    "나눔고딕",
    "Nanum Barun Gothic",
    "나눔바른고딕",
    "Spoqa Han Sans",
    "Spoqa Han Sans Neo",
  ]

  // 시스템에 설치된 한글 폰트 감지
  const installedFonts = koreanFonts.filter((font) => {
    try {
      return document.fonts.check(`12px "${font}"`)
    } catch (e) {
      return false
    }
  })

  // 데이터 속성으로 설정
  document.documentElement.setAttribute("data-system-fonts", installedFonts.join(","))

  return installedFonts
}

// 폰트 로딩 최적화 초기화
export function initFontOptimization() {
  // 폰트 로딩 감지
  detectFontLoading()

  // 시스템 폰트 감지
  const systemFonts = detectSystemFonts()

  // 시스템에 Noto Sans KR이 없는 경우에만 프리로드
  if (!systemFonts.includes("Noto Sans KR")) {
    preloadFonts([
      "https://fonts.gstatic.com/s/notosanskr/v27/PbykFmXiEBPT4ITbgNA5Cgm203Tq4JJWq209pU0DPdWuqxJFA4GNDCBYtw.0.woff2",
    ])
  }

  // 폰트 로딩 타임아웃 설정 (3초 후 폰트 로딩 포기)
  setTimeout(() => {
    if (!document.documentElement.classList.contains("fonts-loaded")) {
      document.documentElement.classList.add("fonts-timeout")
    }
  }, 3000)
}

// 폰트 로딩 성능 측정
export function measureFontPerformance() {
  if (performance && performance.getEntriesByType) {
    const resources = performance.getEntriesByType("resource")
    const fontResources = resources.filter(
      (resource) => resource.initiatorType === "css" || /\.(woff2?|ttf|otf|eot)$/i.test(resource.name),
    )

    return {
      fontCount: fontResources.length,
      totalFontSize: fontResources.reduce((sum, resource) => sum + (resource.encodedBodySize || 0), 0),
      fontLoadTimes: fontResources.map((resource) => ({
        name: resource.name.split("/").pop(),
        duration: resource.duration,
      })),
    }
  }

  return null
}
