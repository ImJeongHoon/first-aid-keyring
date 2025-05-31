"use client"

import Link from "next/link"
import Image from "next/image"
import { MobileNav } from "./mobile-nav"
import { useAuth } from "@/contexts/auth-context"
import { User, LogOut, Settings } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  const { user, logout, isAuthenticated } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16 safe-area-padding-top">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <Link href="/settings" className="mr-3">
            <Settings className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
          </Link>

          <Link href="/" className="flex items-center">
            <div className="relative w-9 h-9 mr-2">
              <Image
                src="/images/logo.png"
                alt="First Aid Keyring Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg text-red-600">First Aid Keyring</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated() ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 py-1 px-3 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
              >
                <User className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-600">{user.name || user.email}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <Link href="/mypage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">
                    내 정보
                  </Link>
                  <Link href="/patient-info" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">
                    의료 정보 관리
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="h-8 border-red-200 text-red-600 hover:bg-red-50">
                  로그인
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="h-8 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                >
                  회원가입
                </Button>
              </Link>
            </div>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
