"use client"

import { useState, useEffect } from "react"

// 화면 크기에 따른 브레이크포인트 정의
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

// 현재 화면 크기를 감지하는 훅
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: typeof window !== "undefined" ? window.innerWidth < breakpoints.md : false,
    isTablet:
      typeof window !== "undefined" ? window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg : false,
    isDesktop: typeof window !== "undefined" ? window.innerWidth >= breakpoints.lg : false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    // iOS에서 실제 뷰포트 높이 계산
    const calculateVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    const handleResize = () => {
      calculateVh()
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < breakpoints.md,
        isTablet: window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg,
        isDesktop: window.innerWidth >= breakpoints.lg,
      })
    }

    // 초기 계산
    calculateVh()

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize)

    // 모바일 기기에서 방향 전환 시 재계산
    window.addEventListener("orientationchange", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [])

  return screenSize
}

// 요소가 화면에 보이는지 감지하는 훅
export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}

// 모바일 기기 감지
export function isMobileDevice() {
  if (typeof navigator === "undefined") return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 터치 기기 감지
export function isTouchDevice() {
  if (typeof window === "undefined") return false

  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}
