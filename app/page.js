"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeartLogo } from "@/components/heart-logo"
import { SplashScreen } from "@/components/splash-screen"
import { MapPin, Heart, User, AlertTriangle, Shield, CheckCircle2, Info, Settings } from "lucide-react"
import Link from "next/link"
import { useScreenSize } from "@/utils/responsive-utils"
import { isFirstAppLaunch, markAppLaunched } from "@/utils/app-state-utils"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const { isMobile, isTablet } = useScreenSize()
  const logoSize = isMobile ? 180 : isTablet ? 200 : 250
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 앱 최초 실행 여부 확인
    const firstLaunch = isFirstAppLaunch()

    // 최초 실행이 아니면 스플래시 화면 건너뛰기
    if (!firstLaunch) {
      setShowSplash(false)
    } else {
      // 앱 실행 기록 저장
      markAppLaunched()
    }

    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // 스플래시 화면이 사라진 후 로딩 상태 시뮬레이션
    if (!showSplash) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        // 로딩 완료 후 웰컴 메시지 표시
        setTimeout(() => setShowWelcome(true), 300)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [showSplash])

  // 스플래시 화면이 표시 중이면 메인 콘텐츠를 렌더링하지 않음
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return (
    <MobileLayout showHeader={false}>
      {/* 로그인, 회원가입, 설정 버튼 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Settings className="h-5 w-5 text-gray-600" />
            <span className="sr-only">설정</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-sm h-9 px-3 rounded-full border-red-200 text-red-600 hover:bg-red-50"
            >
              로그아웃
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/login")}
                className="text-sm h-9 px-3 rounded-full text-gray-600"
              >
                로그인
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => router.push("/register")}
                className="text-sm h-9 px-3 rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="container px-4 py-6 mx-auto mt-12">
        {/* 로고 섹션 - 더 크게 표시 */}
        <div className="flex flex-col items-center justify-center mb-8 mt-8 sm:mb-10 sm:mt-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-100 rounded-full blur-md opacity-70 animate-pulse-glow"></div>
            <HeartLogo className="relative mb-6 animate-bounce-slow" width={logoSize} height={logoSize} />
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-3 transition-all duration-700 ${
              showWelcome ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            응급 의료 정보 키링
          </h1>
          <p
            className={`text-sm sm:text-base text-gray-600 text-center max-w-md transition-all duration-700 delay-300 ${
              showWelcome ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            응급 상황에서 빠르게 의료 정보를 확인할 수 있는 NFC 키링 서비스입니다.
          </p>
        </div>

        {/* NFC 키링 사용법 안내 */}
        <div
          className={`mb-6 sm:mb-8 transition-all duration-700 delay-700 ${
            showWelcome ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3" />
                <h3 className="font-medium text-sm sm:text-base">NFC 키링 사용법</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-50 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-red-600 font-medium mr-2 sm:mr-3 flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">의료 정보 등록하기</h4>
                    <p className="text-xs text-gray-600">
                      회원가입 후 내 정보 관리 페이지에서 의료 정보(혈액형, 알레르기, 복용 약물 등)와 비상 연락처를
                      등록합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-50 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-red-600 font-medium mr-2 sm:mr-3 flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">NFC 키링 연결하기</h4>
                    <p className="text-xs text-gray-600">
                      NFC 키링을 스마트폰에 태그한 후, 내 의료 정보를 키링에 연결합니다. 이제 키링에는 내 의료 정보 접근
                      링크가 저장됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-50 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-red-600 font-medium mr-2 sm:mr-3 flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">응급 상황에서 사용하기</h4>
                    <p className="text-xs text-gray-600">
                      응급 상황 발생 시, 구조자가 NFC 기능이 있는 스마트폰을 키링에 태그하면 저장된 의료 정보를 즉시
                      확인할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <Link href="/patient-info">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 p-0 h-auto flex items-center group text-xs sm:text-sm"
                  >
                    의료 정보 등록하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 주요 기능 섹션 - 간소화 */}
        <section
          className={`py-3 sm:py-4 transition-all duration-700 delay-900 ${
            showWelcome ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">주요 기능</h2>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {/* 응급처치 가이드 */}
            <Link href="/medical-guide" className="block">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full hover:scale-[1.02] transform transition-transform">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">응급처치 가이드</h3>
                    <p className="text-xs sm:text-sm text-gray-600">심폐소생술 등 응급 상황 대처법을 확인합니다.</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* AED 위치 찾기 */}
            <Link href="/aed-map" className="block">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full hover:scale-[1.02] transform transition-transform">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">AED 위치 찾기</h3>
                    <p className="text-xs sm:text-sm text-gray-600">주변 자동심장충격기 위치를 확인합니다.</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 내 정보 관리 */}
            <Link href="/patient-info" className="block">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full hover:scale-[1.02] transform transition-transform">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">내 정보 관리</h3>
                    <p className="text-xs sm:text-sm text-gray-600">의료 정보와 비상 연락처를 등록하고 관리합니다.</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* 서비스 소개 섹션 */}
        <section
          className={`mt-6 sm:mt-8 mb-6 sm:mb-10 transition-all duration-700 delay-1100 ${
            showWelcome ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3" />
                <h3 className="font-medium text-sm sm:text-base">응급 의료 정보 키링 서비스</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                NFC 기술을 활용한 응급 의료 정보 키링은 응급 상황에서 구조자가 환자의 중요한 의료 정보를 빠르게 확인할
                수 있도록 도와줍니다.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-medium text-xs sm:text-sm mb-2">주요 특징</h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span>스마트폰으로 간편하게 스캔하여 의료 정보 확인</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span>알레르기, 복용 약물, 기저질환 등 중요 정보 저장</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span>비상 연락처 및 주치의 정보 즉시 확인</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 응급 상황 대비 팁 */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-700 delay-1300 ${
            showWelcome ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">응급 상황 대비 팁</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    가족 구성원의 의료 정보를 미리 등록하고, 응급 연락처를 설정해 두세요. 응급 상황에서는 침착함을
                    유지하고 119에 신속히 연락하는 것이 중요합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  )
}
