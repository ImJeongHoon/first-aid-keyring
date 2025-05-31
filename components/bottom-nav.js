"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, MapPin, Heart } from "lucide-react"
import { useScreenSize } from "@/utils/responsive-utils"

export function BottomNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { isMobile } = useScreenSize()

  // 하이드레이션 이슈 방지
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // 로그인 페이지, 회원가입 페이지에서는 하단 네비게이션 숨기기
  if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password") {
    return null
  }

  const navItems = [
    {
      href: "/",
      icon: <Home className="w-5 h-5" />,
      label: "홈",
      active: pathname === "/",
    },
    {
      href: "/patient-info",
      icon: <User className="w-5 h-5" />,
      label: "환자 정보",
      active: pathname === "/patient-info",
    },
    {
      href: "/aed-map",
      icon: <MapPin className="w-5 h-5" />,
      label: "AED 찾기",
      active: pathname === "/aed-map",
    },
    {
      href: "/medical-guide",
      icon: <Heart className="w-5 h-5" />,
      label: "응급 가이드",
      active: pathname === "/medical-guide",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={true}
            className={`flex flex-col items-center justify-center ${
              item.active ? "text-red-600" : "text-gray-500 hover:text-gray-700"
            } transition-colors`}
            onClick={(e) => {
              if (item.href === "/" && pathname === "/") {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
          >
            <div className={item.active ? "" : ""}>{item.icon}</div>
            <span
              className={`text-xs mt-1 ${item.active ? "font-medium" : "font-normal"} ${isMobile ? "text-[10px]" : ""}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
