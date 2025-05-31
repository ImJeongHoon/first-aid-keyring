"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { BottomNav } from "@/components/bottom-nav"
import {
  User,
  FileText,
  PhoneCallIcon,
  AlertTriangle,
  CalendarDays,
  Save,
  Trash2,
  MessageSquare,
  PhoneIcon as PhoneIconLucide,
} from "lucide-react"

const tabConfig = {
  basic: {
    value: "basic",
    icon: User,
    title: "기본 정보",
    subtitle: "환자의 기본 인적사항을 입력해주세요",
    bgColor: "bg-pink-50",
    next: "medical",
  },
  medical: {
    value: "medical",
    icon: FileText,
    title: "의료 정보",
    subtitle: "환자의 의료 정보를 입력해주세요",
    bgColor: "bg-blue-50",
    prev: "basic",
    next: "emergency",
  },
  emergency: {
    value: "emergency",
    icon: PhoneCallIcon,
    title: "비상 연락처",
    subtitle: "응급 상황 시 연락할 사람의 정보를 입력해주세요",
    bgColor: "bg-green-50",
    prev: "medical",
  },
}

export default function PatientInfoPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // 환자 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    birthDate: "",
    gender: "",
    bloodType: "",
  })

  // 의료 정보 상태
  const [medicalInfo, setMedicalInfo] = useState({
    allergies: "",
    medications: "",
    conditions: "",
    recentSurgeries: "",
    organDonation: "",
    specialNotes: "",
  })

  // 응급 연락처 상태
  const [emergencyContacts, setEmergencyContacts] = useState([])
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    notes: "",
  })

  useEffect(() => {
    setMounted(true)
    // Load data from localStorage if available
    const storedData = localStorage.getItem("patientInfo")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      if (parsedData.basicInfo) setBasicInfo(parsedData.basicInfo)
      if (parsedData.medicalInfo) setMedicalInfo(parsedData.medicalInfo)
      if (parsedData.emergencyContacts) setEmergencyContacts(parsedData.emergencyContacts)
    }
  }, [])

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated()) {
      router.push("/login?redirect=/patient-info")
    }
  }, [mounted, loading, isAuthenticated, router])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return null // 리다이렉트 중
  }

  const handleInputChange = (setter, field, value) => {
    setter((prev) => ({ ...prev, [field]: value }))
  }

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const newId = emergencyContacts.length > 0 ? Math.max(...emergencyContacts.map((c) => c.id), 0) + 1 : 1
      setEmergencyContacts((prev) => [...prev, { ...newContact, id: newId }])
      setNewContact({ name: "", phone: "", notes: "" })
    }
  }

  const removeEmergencyContact = (id) => {
    setEmergencyContacts((prev) => prev.filter((contact) => contact.id !== id))
  }

  const sendSMS = (phone) => {
    alert(`${phone}로 응급 상황 SMS를 전송했습니다. (데모)`)
  }

  const makeCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const saveAllPatientInfo = () => {
    const patientData = {
      basicInfo,
      medicalInfo,
      emergencyContacts,
    }
    localStorage.setItem("patientInfo", JSON.stringify(patientData))
    alert("환자 정보가 저장되었습니다.")
  }

  const navigateTabs = (direction) => {
    if (direction === "next") {
      const nextTab = tabConfig[activeTab]?.next
      if (nextTab) setActiveTab(nextTab)
    } else if (direction === "prev") {
      const prevTab = tabConfig[activeTab]?.prev
      if (prevTab) setActiveTab(prevTab)
    }
  }

  const CurrentTabIcon = tabConfig[activeTab].icon

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      {/* 119 Emergency Call Button */}
      <button
        onClick={() => (window.location.href = "tel:119")}
        className="bg-red-600 text-white p-2 flex items-center justify-center sticky top-0 z-50 shadow-md w-full hover:bg-red-700 transition-colors"
      >
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span className="font-semibold">119 긴급 전화</span>
        <PhoneCallIcon className="w-5 h-5 ml-2" />
      </button>

      <div className="container mx-auto px-4 py-6 flex-grow max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">환자 인적사항</h1>
          <p className="text-gray-600 mt-1">응급 상황에서 의료진이 확인할 수 있는 중요한 의료 정보를 입력해주세요.</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-1 mb-6 border border-gray-200 rounded-lg p-1 bg-gray-50">
          {Object.values(tabConfig).map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center transition-colors
                ${activeTab === tab.value ? "bg-white text-red-600 shadow border border-red-300" : "text-gray-600 hover:bg-gray-200"}`}
              >
                <TabIcon className={`w-4 h-4 mr-2 ${activeTab === tab.value ? "text-red-600" : "text-gray-500"}`} />
                {tab.title}
              </button>
            )
          })}
        </div>

        {/* Tab Content Area */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className={`p-4 rounded-lg mb-6 ${tabConfig[activeTab].bgColor}`}>
            <div className="flex items-center text-gray-700">
              <CurrentTabIcon className="w-6 h-6 mr-3 text-red-600" />
              <div>
                <h2 className="text-xl font-semibold">{tabConfig[activeTab].title}</h2>
                <p className="text-sm text-gray-600">{tabConfig[activeTab].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" /> 이름 <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  value={basicInfo.name}
                  onChange={(e) => handleInputChange(setBasicInfo, "name", e.target.value)}
                  placeholder=""
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="birthDate" className="font-medium text-gray-700 flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2 text-gray-500" /> 생년월일{" "}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="text"
                  value={basicInfo.birthDate}
                  onChange={(e) => handleInputChange(setBasicInfo, "birthDate", e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="mt-1"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
              <div>
                <Label htmlFor="gender" className="font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" /> 성별 <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  value={basicInfo.gender}
                  onValueChange={(value) => handleInputChange(setBasicInfo, "gender", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="성별 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">남성</SelectItem>
                    <SelectItem value="female">여성</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodType" className="font-medium text-gray-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-gray-500"
                  >
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
                    <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  </svg>
                  혈액형 <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  value={basicInfo.bloodType}
                  onValueChange={(value) => handleInputChange(setBasicInfo, "bloodType", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="혈액형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="UNKNOWN">모름</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => router.back()} className="w-2/5">
                  뒤로가기
                </Button>
                <Button onClick={() => navigateTabs("next")} className="bg-red-500 hover:bg-red-600 text-white w-2/5">
                  다음
                </Button>
              </div>
            </div>
          )}

          {/* Medical Info Tab */}
          {activeTab === "medical" && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="allergies" className="font-medium text-gray-700">
                  알레르기
                </Label>
                <Textarea
                  id="allergies"
                  value={medicalInfo.allergies}
                  onChange={(e) => handleInputChange(setMedicalInfo, "allergies", e.target.value)}
                  placeholder="알레르기가 있다면 입력해주세요"
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="medications" className="font-medium text-gray-700">
                  복용 중인 약물
                </Label>
                <Textarea
                  id="medications"
                  value={medicalInfo.medications}
                  onChange={(e) => handleInputChange(setMedicalInfo, "medications", e.target.value)}
                  placeholder="현재 복용 중인 약물을 입력해주세요"
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="conditions" className="font-medium text-gray-700">
                  기저질환
                </Label>
                <Textarea
                  id="conditions"
                  value={medicalInfo.conditions}
                  onChange={(e) => handleInputChange(setMedicalInfo, "conditions", e.target.value)}
                  placeholder=""
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="recentSurgeries" className="font-medium text-gray-700">
                  최근 수술이력
                </Label>
                <Textarea
                  id="recentSurgeries"
                  value={medicalInfo.recentSurgeries}
                  onChange={(e) => handleInputChange(setMedicalInfo, "recentSurgeries", e.target.value)}
                  placeholder=""
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="organDonation" className="font-medium text-gray-700">
                  장기기증/헌혈 여부
                </Label>
                <Select
                  value={medicalInfo.organDonation}
                  onValueChange={(value) => handleInputChange(setMedicalInfo, "organDonation", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">미지정</SelectItem>
                    <SelectItem value="blood">헌혈 희망</SelectItem>
                    <SelectItem value="organ">장기기증 희망</SelectItem>
                    <SelectItem value="both">헌혈 및 장기기증 희망</SelectItem>
                    <SelectItem value="no">헌혈/장기기증 거부</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="specialNotes" className="font-medium text-gray-700">
                  특별 지시사항
                </Label>
                <Textarea
                  id="specialNotes"
                  value={medicalInfo.specialNotes}
                  onChange={(e) => handleInputChange(setMedicalInfo, "specialNotes", e.target.value)}
                  placeholder=""
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigateTabs("prev")} className="w-2/5">
                  이전
                </Button>
                <Button onClick={() => navigateTabs("next")} className="bg-blue-500 hover:bg-blue-600 text-white w-2/5">
                  다음
                </Button>
              </div>
            </div>
          )}

          {/* Emergency Contact Tab */}
          {activeTab === "emergency" && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="contactName" className="font-medium text-gray-700">
                  비상 연락처 이름
                </Label>
                <Input
                  id="contactName"
                  value={newContact.name}
                  onChange={(e) => handleInputChange(setNewContact, "name", e.target.value)}
                  placeholder=""
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone" className="font-medium text-gray-700">
                  비상 연락처 전화번호
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => handleInputChange(setNewContact, "phone", e.target.value)}
                  placeholder=""
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contactNotes" className="font-medium text-gray-700">
                  추가 참고사항
                </Label>
                <Textarea
                  id="contactNotes"
                  value={newContact.notes}
                  onChange={(e) => handleInputChange(setNewContact, "notes", e.target.value)}
                  placeholder="의료진이 알아야 할 추가 정보를 입력해주세요"
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <Button
                onClick={addEmergencyContact}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                연락처 추가하기
              </Button>

              {emergencyContacts.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <PhoneCallIcon className="w-5 h-5 mr-2 text-gray-500" /> 등록된 비상 연락처
                  </h3>
                  <div className="space-y-3">
                    {emergencyContacts.map((contact) => (
                      <div key={contact.id} className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                            {contact.notes && <p className="text-xs text-gray-500 mt-1">참고: {contact.notes}</p>}
                          </div>
                          <div className="flex space-x-1.5">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => sendSMS(contact.phone)}
                              className="h-8 w-8"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => makeCall(contact.phone)}
                              className="h-8 w-8"
                            >
                              <PhoneIconLucide className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => removeEmergencyContact(contact.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigateTabs("prev")} className="w-2/5">
                  이전
                </Button>
                <Button
                  onClick={saveAllPatientInfo}
                  className="bg-green-500 hover:bg-green-600 text-white w-2/5 flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" /> 저장하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
