// 더블 탭 방지 (iOS에서 링크 더블 탭 시 확대 방지)
export function preventDoubleTapZoom(event) {
  event.preventDefault()
  event.stopPropagation()
}

// 터치 이벤트 최적화 (터치 지연 제거)
export function enableFastClick(element) {
  if (!element) return

  element.addEventListener("touchstart", () => {}, { passive: true })
}

// iOS 100vh 문제 해결을 위한 함수
export function setVhProperty() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

// 모바일 디바이스 감지
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 앱 설치 프롬프트 표시 (PWA)
export function showInstallPrompt(deferredPrompt) {
  if (!deferredPrompt) return

  // 설치 프롬프트 표시
  deferredPrompt.prompt()

  // 사용자 응답 확인
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("사용자가 앱 설치를 수락했습니다")
    } else {
      console.log("사용자가 앱 설치를 거부했습니다")
    }
  })
}
