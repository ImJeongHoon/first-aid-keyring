"use client"

import { useEffect } from "react"
import { BottomNav } from "./bottom-nav"

export function MobileLayout({ children }) {
  // iOS에서 스크롤 시 주소창 높이 변화에 대응
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      // 스크롤 시 주소창 높이 변화에 대응하여 --vh 값 재계산
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="mobile-container min-h-screen bg-gray-50 pb-[calc(var(--app-bottom-nav-height)+env(safe-area-inset-bottom,0px))]">
      <main className="safe-area-padding-top safe-area-padding-left safe-area-padding-right">{children}</main>
      <BottomNav />
    </div>
  )
}
