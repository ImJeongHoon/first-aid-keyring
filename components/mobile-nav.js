"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, MapPin, Scan, Home, Settings, AlertTriangle } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  // 모바일 메뉴가 열렸을 때 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      // 스크롤 위치 저장
      const scrollY = window.scrollY

      // 스크롤 방지
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      // 스크롤 복원
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""

      // 스크롤 위치 복원
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1)
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // 메뉴 아이템 클릭 핸들러
  const handleMenuItemClick = () => {
    setMobileMenuOpen(false)
    // 스크롤 위치 초기화
    window.scrollTo(0, 0)
  }

  return (
    <>
      {/* 모바일 메뉴 토글 버튼 */}
      <button
        type="button"
        className="p-2 z-50 rounded-md hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setMobileMenuOpen(!mobileMenuOpen)
        }}
        aria-label="메뉴 열기/닫기"
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col overflow-y-auto safe-area-padding-top safe-area-padding-bottom">
          <div className="flex flex-col items-center justify-center space-y-6 pt-24 pb-8">
            <Link
              href="/"
              className={`text-xl font-medium flex items-center ${pathname === "/" ? "text-red-600" : "text-gray-800 hover:text-red-600"} transition-colors`}
              onClick={handleMenuItemClick}
            >
              <Home className="w-5 h-5 mr-2" />홈
            </Link>
            <Link
              href="/patient-info"
              className={`text-xl font-medium flex items-center ${pathname === "/patient-info" || pathname.startsWith("/patient/") ? "text-red-600" : "text-gray-800 hover:text-red-600"} transition-colors`}
              onClick={handleMenuItemClick}
            >
              <User className="w-5 h-5 mr-2" />
              환자 정보
            </Link>
            <Link
              href="/aed-map"
              className={`text-xl font-medium flex items-center ${pathname === "/aed-map" ? "text-red-600" : "text-gray-800 hover:text-red-600"} transition-colors`}
              onClick={handleMenuItemClick}
            >
              <MapPin className="w-5 h-5 mr-2" />
              AED 위치
            </Link>
            <Link
              href="/scan"
              className={`text-xl font-medium flex items-center ${pathname === "/scan" ? "text-red-600" : "text-gray-800 hover:text-red-600"} transition-colors`}
              onClick={handleMenuItemClick}
            >
              <Scan className="w-5 h-5 mr-2" />
              NFC 스캔
            </Link>
            <Link
              href="/medical-guide"
              className={`text-xl font-medium flex items-center ${pathname === "/medical-guide" ? "text-red-600" : "text-gray-800 hover:text-red-600"} transition-colors`}
              onClick={handleMenuItemClick}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              응급처치 가이드
            </Link>
            <Link
              href="/settings"
              className={`text-xl font-medium flex items-center ${pathname === "/settings" ? "text-red-600" : "text-gray-800 hover:text-red-600"} transition-colors`}
              onClick={handleMenuItemClick}
            >
              <Settings className="w-5 h-5 mr-2" />
              설정
            </Link>

            <div className="pt-6 flex flex-col space-y-4 w-full px-12">
              {isAuthenticated() ? (
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 py-2.5"
                  onClick={() => {
                    logout()
                    handleMenuItemClick()
                  }}
                >
                  로그아웃
                </Button>
              ) : (
                <>
                  <Link href="/login" onClick={handleMenuItemClick}>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 py-2.5"
                    >
                      로그인
                    </Button>
                  </Link>
                  <Link href="/register" onClick={handleMenuItemClick}>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2.5">
                      회원가입
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
