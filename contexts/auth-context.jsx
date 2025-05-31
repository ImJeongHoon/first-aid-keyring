"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// 인증 컨텍스트 생성
const AuthContext = createContext(null)

// 토큰 만료 시간 (7일)
const TOKEN_EXPIRY_DAYS = 7

// 인증 컨텍스트 프로바이더 컴포넌트
export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [autoLogin, setAutoLogin] = useState(true) // 자동 로그인 기본값 true

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const loadUserData = () => {
      if (typeof window === "undefined") return

      const storedUser = localStorage.getItem("user")
      const storedToken = localStorage.getItem("authToken")
      const tokenExpiry = localStorage.getItem("tokenExpiry")
      const storedAutoLogin = localStorage.getItem("autoLogin")

      // 자동 로그인 설정 불러오기
      if (storedAutoLogin !== null) {
        setAutoLogin(storedAutoLogin === "true")
      }

      // 자동 로그인이 활성화되어 있고, 토큰이 있는 경우
      if (autoLogin && storedUser && storedToken) {
        try {
          // 토큰 만료 확인
          if (tokenExpiry && new Date(tokenExpiry) > new Date()) {
            setUser(JSON.parse(storedUser))
            // 토큰 만료 시간이 절반 이상 지났으면 토큰 갱신
            if (new Date(tokenExpiry).getTime() - new Date().getTime() < (TOKEN_EXPIRY_DAYS * 86400000) / 2) {
              refreshToken()
            }
          } else {
            // 토큰이 만료된 경우 로그아웃
            clearAuthData()
          }
        } catch (error) {
          console.error("Failed to parse user data:", error)
          clearAuthData()
        }
      }
      setLoading(false)
    }

    loadUserData()
  }, [])

  // 토큰 갱신 함수
  const refreshToken = () => {
    // 실제 구현에서는 API를 호출하여 토큰을 갱신해야 합니다.
    // 여기서는 단순히 만료 시간만 연장합니다.
    const newExpiry = new Date()
    newExpiry.setDate(newExpiry.getDate() + TOKEN_EXPIRY_DAYS)
    localStorage.setItem("tokenExpiry", newExpiry.toISOString())
    console.log("토큰 갱신됨, 새 만료일:", newExpiry)
  }

  // 인증 데이터 초기화 함수
  const clearAuthData = () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    localStorage.removeItem("tokenExpiry")
    setUser(null)
  }

  // 로그인 함수
  const login = (userData, rememberMe = true) => {
    if (typeof window === "undefined") return

    setUser(userData)
    setAutoLogin(rememberMe)

    // 사용자 정보 저장
    localStorage.setItem("user", JSON.stringify(userData))

    // 자동 로그인 설정 저장
    localStorage.setItem("autoLogin", rememberMe.toString())

    // 토큰 생성 및 저장 (실제로는 서버에서 받아야 함)
    const token = generateMockToken()
    localStorage.setItem("authToken", token)

    // 토큰 만료 시간 설정
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + TOKEN_EXPIRY_DAYS)
    localStorage.setItem("tokenExpiry", expiry.toISOString())
  }

  // 목업 토큰 생성 함수 (실제로는 서버에서 JWT 토큰을 받아야 함)
  const generateMockToken = () => {
    return "mock_token_" + Math.random().toString(36).substring(2, 15)
  }

  // 로그아웃 함수
  const logout = () => {
    clearAuthData()
    router.push("/")
  }

  // 인증 상태 확인 함수
  const isAuthenticated = () => {
    return !!user
  }

  // 자동 로그인 설정 변경 함수
  const setRememberMe = (value) => {
    if (typeof window === "undefined") return
    setAutoLogin(value)
    localStorage.setItem("autoLogin", value.toString())
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    autoLogin,
    setRememberMe,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 인증 컨텍스트 사용을 위한 훅
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
