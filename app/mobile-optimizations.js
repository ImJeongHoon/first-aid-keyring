"use client"

import { useEffect } from "react"

export function MobileOptimizations() {
  useEffect(() => {
    // iOS Safari에서 100vh 문제 해결을 위한 함수
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // 모바일 터치 지연 제거
    const removeTouchDelay = () => {
      const style = document.createElement("style")
      style.innerHTML = `
        * {
          touch-action: manipulation;
        }
        
        @supports (-webkit-touch-callout: none) {
          .mobile-height {
            height: calc(var(--vh, 1vh) * 100);
          }
          
          .mobile-safe-area {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
          
          .safe-area-padding-top {
            padding-top: env(safe-area-inset-top);
          }
          
          .safe-area-padding-bottom {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `
      document.head.appendChild(style)
    }

    setVh()
    removeTouchDelay()

    // 이벤트 리스너 추가
    window.addEventListener("resize", setVh)
    window.addEventListener("orientationchange", () => {
      setTimeout(setVh, 100) // 방향 변경 후 정확한 계산을 위한 지연
    })

    // 더블 탭 확대 방지
    document.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      },
      { passive: false },
    )

    let lastTouchEnd = 0
    document.addEventListener(
      "touchend",
      (event) => {
        const now = Date.now()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      },
      { passive: false },
    )

    return () => {
      window.removeEventListener("resize", setVh)
      window.removeEventListener("orientationchange", setVh)
    }
  }, [])

  return null
}
