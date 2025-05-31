"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { startNfcScan, stopNfcScan, isNfcSupported, simulateNfcScan } from "@/utils/nfc-utils"
import { toast } from "sonner"

// NFC 컨텍스트 생성
const NfcContext = createContext(undefined)

// NFC 컨텍스트 프로바이더 컴포넌트
export function NfcProvider({ children, autoStart = true }) {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [lastScanResult, setLastScanResult] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // NFC 지원 여부 확인
  useEffect(() => {
    setIsSupported(isNfcSupported())
    setIsInitialized(true)
  }, [])

  // NFC 스캔 결과 처리
  const handleScanResult = (result) => {
    setLastScanResult(result)

    if (result.success && result.patientId) {
      // 환자 정보 페이지로 이동
      router.push(`/patient/${result.patientId}`)
      toast.success("환자 정보를 불러옵니다")
    } else if (result.error) {
      toast.error(result.error)
    }
  }

  // NFC 스캔 시작
  const startScan = async () => {
    if (isScanning) return true

    const success = await startNfcScan(handleScanResult)
    setIsScanning(success)

    if (success) {
      toast.info("NFC 스캔이 시작되었습니다. 키링을 기기에 가까이 대세요.")
    }

    return success
  }

  // NFC 스캔 중지
  const stopScan = () => {
    stopNfcScan()
    setIsScanning(false)
  }

  // 테스트용 가짜 스캔
  const simulateScan = (patientId) => {
    simulateNfcScan(patientId, handleScanResult)
  }

  // 자동 시작 설정
  useEffect(() => {
    if (isInitialized && autoStart && isSupported) {
      startScan()
    }

    // 컴포넌트 언마운트 시 스캔 중지
    return () => {
      stopScan()
    }
  }, [isInitialized, autoStart, isSupported])

  const value = {
    isScanning,
    isSupported,
    lastScanResult,
    startScan,
    stopScan,
    simulateScan,
  }

  return <NfcContext.Provider value={value}>{children}</NfcContext.Provider>
}

// NFC 컨텍스트 사용을 위한 훅
export function useNfc() {
  const context = useContext(NfcContext)
  if (context === undefined) {
    throw new Error("useNfc must be used within a NfcProvider")
  }
  return context
}
