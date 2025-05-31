"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    // 로그아웃 처리
    logout()

    // 로그인 페이지로 리디렉션
    router.push("/login")
  }, [logout, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">로그아웃 중입니다...</p>
      </div>
    </div>
  )
}
