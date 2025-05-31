"use client"

import { useEffect } from "react"
import { setupGlobalErrorHandler } from "@/utils/error-handler"

export default function PatientInfoLayout({ children }) {
  useEffect(() => {
    // 전역 오류 핸들러 설정
    setupGlobalErrorHandler()
  }, [])

  return <>{children}</>
}
