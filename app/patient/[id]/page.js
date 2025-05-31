"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Phone, User, Heart, AlertTriangle, ArrowLeft } from "lucide-react"
import { MobileLayout } from "@/components/mobile-layout"
import { mockPatients } from "@/data/mock-data"

export default function PatientInfoPage() {
  const params = useParams()
  const patientId = params.id

  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("medical")

  // 페이지 로드 시 스크롤 위치 초기화 및 스타일 리셋
  useEffect(() => {
    // 스크롤 위치 강제 초기화
    window.scrollTo(0, 0)

    // 모바일 화면 문제 해결을 위한 추가 코드
    document.body.style.overflow = "auto"
    document.body.style.position = "static"
    document.body.style.height = "auto"
    document.body.style.width = "100%"
    document.documentElement.style.height = "auto"
  }, [])

  // 환자 정보 가져오기
  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true)
      try {
        // 임시 데이터 사용
        await new Promise((resolve) => setTimeout(resolve, 1000)) // 로딩 시뮬레이션

        const mockPatient = mockPatients[patientId]

        if (mockPatient) {
          setPatient(mockPatient)
        } else {
          setError("환자 정보를 찾을 수 없습니다")
        }
      } catch (err) {
        console.error("환자 정보 가져오기 실패:", err)
        setError("환자 정보를 불러오는 중 오류가 발생했습니다")
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchPatientData()
    }
  }, [patientId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">환자 정보를 불러오는 중</h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="max-w-md w-full text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">{error || "환자 정보를 찾을 수 없습니다"}</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <MobileLayout>
      <div className="container px-4 py-8 sm:py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">응급 의료 정보</h1>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-800">응급 상황 안내</h3>
              <p className="text-red-700 text-sm">
                이 정보는 응급 상황에서 의료진이 참고할 수 있는 정보입니다. 응급 상황 시 즉시 119에 연락하세요.
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-8">
            <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
              <CardTitle className="flex items-center text-xl sm:text-2xl">
                <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-500" />
                환자 기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">이름</h3>
                  <p className="text-lg font-semibold">{patient.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">생년월일</h3>
                  <p className="text-lg font-semibold">
                    {patient.birthdate} ({patient.age}세)
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">성별</h3>
                  <p className="text-lg font-semibold">{patient.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">혈액형</h3>
                  <p className="text-lg font-semibold">{patient.bloodType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="medical"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
              >
                <Heart className="w-4 h-4 mr-2" />
                의료 정보
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                비상 연락처
              </TabsTrigger>
            </TabsList>

            <TabsContent value="medical">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                    의료 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">알레르기</h3>
                    <p className="p-3 bg-gray-50 rounded-lg">{patient.allergies || "없음"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">복용 중인 약물</h3>
                    <p className="p-3 bg-gray-50 rounded-lg">{patient.medications || "없음"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">기저질환</h3>
                    <p className="p-3 bg-gray-50 rounded-lg">{patient.conditions || "없음"}</p>
                  </div>
                  {patient.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">추가 참고사항</h3>
                      <p className="p-3 bg-gray-50 rounded-lg">{patient.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                    비상 연락처
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">비상 연락처</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-lg">{patient.emergencyContact}</p>
                        <a href={`tel:${patient.emergencyPhone}`} className="flex items-center text-blue-600 mt-2">
                          <Phone className="w-4 h-4 mr-2" />
                          {patient.emergencyPhone}
                        </a>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a href={`tel:${patient.emergencyPhone}`}>
                        <Button className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                          <Phone className="w-4 h-4 mr-2" />
                          비상 연락처로 전화하기
                        </Button>
                      </a>
                    </div>
                    <div>
                      <a href="tel:119">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          119 응급 신고
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MobileLayout>
  )
}
