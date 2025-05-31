"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, Settings, Bell, Shield, Phone, Save, AlertTriangle, Heart, Calendar, Droplet } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [profileData, setProfileData] = useState({
    name: "홍길동",
    email: "user@example.com",
    phone: "010-1234-5678",
    birthdate: "1990-01-01",
    gender: "male",
    bloodType: "A+",
    address: "서울시 강남구",
  })

  const [medicalData, setMedicalData] = useState({
    allergies: "없음",
    medications: "고혈압약",
    conditions: "고혈압",
    notes: "특이사항 없음",
  })

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "홍부모", relationship: "부모", phone: "010-9876-5432" },
    { id: 2, name: "김의사", relationship: "주치의", phone: "010-1111-2222" },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    emergencyAlerts: true,
    medicationReminders: true,
  })

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0)
  }, [])

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // 프로필 업데이트 API 호출 시뮬레이션
    setTimeout(() => {
      setSuccess("프로필이 성공적으로 업데이트되었습니다.")
      setIsLoading(false)
    }, 1000)
  }

  const handleMedicalSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // 의료 정보 업데이트 API 호출 시뮬레이션
    setTimeout(() => {
      setSuccess("의료 정보가 성공적으로 업데이트되었습니다.")
      setIsLoading(false)
    }, 1000)
  }

  const handleEmergencyContactSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // 비상 연락처 업데이트 API 호출 시뮬레이션
    setTimeout(() => {
      setSuccess("비상 연락처가 성공적으로 업데이트되었습니다.")
      setIsLoading(false)
    }, 1000)
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // 알림 설정 업데이트 API 호출 시뮬레이션
    setTimeout(() => {
      setSuccess("알림 설정이 성공적으로 업데이트되었습니다.")
      setIsLoading(false)
    }, 1000)
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMedicalChange = (e) => {
    const { name, value } = e.target
    setMedicalData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  return (
    <MobileLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-3">마이페이지</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-3"></div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">개인 정보와 설정을 관리하세요</p>
          </div>

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200 rounded-xl">
              <AlertTriangle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">성공</AlertTitle>
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 rounded-xl">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="profile"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                프로필
              </TabsTrigger>
              <TabsTrigger
                value="medical"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs"
              >
                <Heart className="w-3 h-3 mr-1" />
                의료 정보
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs"
              >
                <Phone className="w-3 h-3 mr-1" />
                비상 연락처
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm text-xs"
              >
                <Settings className="w-3 h-3 mr-1" />
                설정
              </TabsTrigger>
            </TabsList>

            {/* 프로필 탭 */}
            <TabsContent value="profile">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-4 h-4 mr-2 text-red-500" />
                    프로필 정보
                  </CardTitle>
                  <CardDescription>개인 정보를 관리하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium flex items-center">
                          <User className="w-3 h-3 mr-1 text-red-500" />
                          이름
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="h-10 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          이메일
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="h-10 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          전화번호
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="h-10 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthdate" className="text-sm font-medium flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-red-500" />
                          생년월일
                        </Label>
                        <Input
                          id="birthdate"
                          name="birthdate"
                          type="date"
                          value={profileData.birthdate}
                          onChange={handleProfileChange}
                          className="h-10 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bloodType" className="text-sm font-medium flex items-center">
                          <Droplet className="w-3 h-3 mr-1 text-red-500" />
                          혈액형
                        </Label>
                        <Input
                          id="bloodType"
                          name="bloodType"
                          value={profileData.bloodType}
                          onChange={handleProfileChange}
                          className="h-10 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium">
                          주소
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                          className="h-10 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 h-12 korean-text-fix"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>저장 중...</>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              변경사항 저장
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 의료 정보 탭 */}
            <TabsContent value="medical">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="w-4 h-4 mr-2 text-blue-500" />
                    의료 정보
                  </CardTitle>
                  <CardDescription>의료 정보를 관리하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <form onSubmit={handleMedicalSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="allergies" className="text-sm font-medium">
                          알레르기
                        </Label>
                        <Textarea
                          id="allergies"
                          name="allergies"
                          value={medicalData.allergies}
                          onChange={handleMedicalChange}
                          placeholder="알레르기가 있다면 입력해주세요"
                          className="min-h-[80px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medications" className="text-sm font-medium">
                          복용 중인 약물
                        </Label>
                        <Textarea
                          id="medications"
                          name="medications"
                          value={medicalData.medications}
                          onChange={handleMedicalChange}
                          placeholder="현재 복용 중인 약물을 입력해주세요"
                          className="min-h-[80px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="conditions" className="text-sm font-medium">
                          기저질환
                        </Label>
                        <Textarea
                          id="conditions"
                          name="conditions"
                          value={medicalData.conditions}
                          onChange={handleMedicalChange}
                          placeholder="당뇨, 고혈압 등 기저질환을 입력해주세요"
                          className="min-h-[80px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">
                          추가 참고사항
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={medicalData.notes}
                          onChange={handleMedicalChange}
                          placeholder="의료진이 알아야 할 추가 정보를 입력해주세요"
                          className="min-h-[80px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 h-12 korean-text-fix"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>저장 중...</>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              변경사항 저장
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 비상 연락처 탭 */}
            <TabsContent value="emergency">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                    비상 연락처
                  </CardTitle>
                  <CardDescription>응급 상황 시 연락할 사람의 정보를 관리하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <form onSubmit={handleEmergencyContactSubmit}>
                    <div className="space-y-4">
                      {emergencyContacts.map((contact, index) => (
                        <div key={contact.id} className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">비상 연락처 {index + 1}</h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                const newContacts = [...emergencyContacts]
                                newContacts.splice(index, 1)
                                setEmergencyContacts(newContacts)
                              }}
                            >
                              삭제
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label htmlFor={`contact-${contact.id}-name`} className="text-sm">
                                  이름
                                </Label>
                                <Input
                                  id={`contact-${contact.id}-name`}
                                  value={contact.name}
                                  onChange={(e) => {
                                    const newContacts = [...emergencyContacts]
                                    newContacts[index].name = e.target.value
                                    setEmergencyContacts(newContacts)
                                  }}
                                  className="h-10 rounded-lg"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor={`contact-${contact.id}-relationship`} className="text-sm">
                                  관계
                                </Label>
                                <Input
                                  id={`contact-${contact.id}-relationship`}
                                  value={contact.relationship}
                                  onChange={(e) => {
                                    const newContacts = [...emergencyContacts]
                                    newContacts[index].relationship = e.target.value
                                    setEmergencyContacts(newContacts)
                                  }}
                                  className="h-10 rounded-lg"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor={`contact-${contact.id}-phone`} className="text-sm">
                                전화번호
                              </Label>
                              <Input
                                id={`contact-${contact.id}-phone`}
                                value={contact.phone}
                                onChange={(e) => {
                                  const newContacts = [...emergencyContacts]
                                  newContacts[index].phone = e.target.value
                                  setEmergencyContacts(newContacts)
                                }}
                                className="h-10 rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 border-dashed border-gray-300 hover:border-green-300 hover:bg-green-50 rounded-xl korean-text-fix"
                        onClick={() => {
                          setEmergencyContacts([
                            ...emergencyContacts,
                            {
                              id: Date.now(),
                              name: "",
                              relationship: "",
                              phone: "",
                            },
                          ])
                        }}
                      >
                        + 비상 연락처 추가
                      </Button>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200 h-12 korean-text-fix"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>저장 중...</>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              변경사항 저장
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 설정 탭 */}
            <TabsContent value="settings">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="w-4 h-4 mr-2 text-purple-500" />
                    설정
                  </CardTitle>
                  <CardDescription>앱 설정을 관리하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Bell className="w-4 h-4 mr-2 text-purple-500" />
                          알림 설정
                        </h3>
                        <div className="space-y-4">
                          {/* 스위치 버튼 레이아웃 수정 */}
                          <div className="flex items-center justify-between space-x-2 p-3 border border-gray-100 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">긴급 알림</p>
                              <p className="text-xs text-gray-500">응급 상황 발생 시 알림을 받습니다</p>
                            </div>
                            <Switch
                              checked={notificationSettings.emergencyAlerts}
                              onCheckedChange={() => handleNotificationChange("emergencyAlerts")}
                              className="data-[state=checked]:bg-purple-600 flex-shrink-0 h-6 w-11"
                            />
                          </div>

                          <div className="flex items-center justify-between space-x-2 p-3 border border-gray-100 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">약물 복용 알림</p>
                              <p className="text-xs text-gray-500">약물 복용 시간에 알림을 받습니다</p>
                            </div>
                            <Switch
                              checked={notificationSettings.medicationReminders}
                              onCheckedChange={() => handleNotificationChange("medicationReminders")}
                              className="data-[state=checked]:bg-purple-600 flex-shrink-0 h-6 w-11"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-purple-500" />
                          보안 설정
                        </h3>
                        <div className="space-y-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start h-12 border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl korean-text-fix"
                          >
                            비밀번호 변경
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start h-12 border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl text-red-600 hover:text-red-700 korean-text-fix"
                          >
                            계정 삭제
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200 h-12 korean-text-fix"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>저장 중...</>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              변경사항 저장
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MobileLayout>
  )
}
