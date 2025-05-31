// 전역 오류 핸들러 설정
export function setupGlobalErrorHandler() {
  if (typeof window === "undefined") return

  // 이미 설정된 경우 중복 설정 방지
  if (window._errorHandlerSetup) return
  window._errorHandlerSetup = true

  // 처리되지 않은 오류 캐치
  window.addEventListener("error", (event) => {
    console.error("전역 오류 발생:", event.error || event.message)

    // CORS 관련 스크립트 오류 특별 처리
    if (event.message === "Script error." || event.message.includes("cross-origin")) {
      console.warn("크로스 오리진 스크립트 오류가 발생했습니다. CORS 설정을 확인하세요.")
    }

    // 오류 분석 및 로깅 (실제 프로덕션에서는 서버로 전송)
    const errorInfo = {
      message: event.message || "알 수 없는 오류",
      source: event.filename || event.srcElement?.src || "알 수 없는 소스",
      line: event.lineno || "?",
      column: event.colno || "?",
      stack: event.error?.stack || "스택 정보 없음",
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }

    console.debug("오류 상세 정보:", errorInfo)

    // 사용자에게 오류 알림 (필요한 경우)
    // showErrorNotification(errorInfo.message);
  })

  // 처리되지 않은 Promise 오류 캐치
  window.addEventListener("unhandledrejection", (event) => {
    console.error("처리되지 않은 Promise 오류:", event.reason)

    // 오류 분석 및 로깅
    const errorInfo = {
      message: event.reason?.message || "알 수 없은 Promise 오류",
      stack: event.reason?.stack || "스택 정보 없음",
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }

    console.debug("Promise 오류 상세 정보:", errorInfo)
  })
}

// 개발 모드 확인 (클라이언트 안전 버전)
export function isDevelopmentMode() {
  // 클라이언트에서는 window 객체의 location을 확인
  if (typeof window !== "undefined") {
    // 개발 서버는 일반적으로 localhost 또는 특정 개발 도메인에서 실행됨
    const hostname = window.location.hostname
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.includes(".local") ||
      hostname.endsWith(".vercel.app")
    ) // 개발 배포 URL
  }

  // 서버에서는 NODE_ENV 사용 (이 부분은 서버 컴포넌트에서만 실행됨)
  return false // 클라이언트에서는 기본적으로 false 반환
}

// 오류 로깅 함수
export function logError(error, context = "") {
  const isDev = isDevelopmentMode()

  if (isDev) {
    console.error(`[${context}] 오류:`, error)
  } else {
    // 프로덕션 환경에서는 민감한 정보를 제외하고 로깅
    console.error(`[${context}] 오류가 발생했습니다`)
  }
}

// 사용자 친화적인 오류 메시지 생성
export function getUserFriendlyErrorMessage(error) {
  // 네트워크 오류
  if (error.message && error.message.includes("network")) {
    return "네트워크 연결을 확인해주세요."
  }

  // 인증 관련 오류
  if (error.status === 401 || error.status === 403) {
    return "로그인이 필요하거나 접근 권한이 없습니다."
  }

  // 서버 오류
  if (error.status >= 500) {
    return "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
  }

  // 기본 오류 메시지
  return "오류가 발생했습니다. 다시 시도해주세요."
}
