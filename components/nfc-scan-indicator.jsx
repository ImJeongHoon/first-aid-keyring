"use client"

import { useState, useEffect } from "react"
import { useNfc } from "@/contexts/nfc-context"
import { Smartphone, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function NfcScanIndicator() {
  const { isScanning, isSupported, stopScan, startScan } = useNfc()
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // 스캔 상태에 따라 표시 여부 결정
  useEffect(() => {
    if (isScanning) {
      setIsVisible(true)
      // 5초 후 최소화
      const timer = setTimeout(() => {
        setIsMinimized(true)
      }, 5000)

      return () => clearTimeout(timer)
    } else {
      setIsMinimized(false)
      // 애니메이션을 위해 약간 지연 후 완전히 숨김
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isScanning])

  // 지원하지 않는 경우 표시하지 않음
  if (!isSupported) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-4 z-50"
        >
          {isMinimized ? (
            // 최소화된 상태
            <motion.button
              onClick={() => setIsMinimized(false)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="w-6 h-6" />
            </motion.button>
          ) : (
            // 확장된 상태
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-64">
              <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">NFC 스캔 활성화됨</span>
                </div>
                <button
                  onClick={() => (isScanning ? setIsMinimized(true) : stopScan())}
                  className="text-white hover:bg-blue-600 rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="relative mr-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">NFC 키링을 스캔하세요</p>
                    <p className="text-xs text-gray-500">기기 뒷면에 키링을 가까이 대세요</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => stopScan()}
                    className="flex-1 py-1.5 px-3 text-xs rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    중지
                  </button>
                  <button
                    onClick={() => {
                      stopScan()
                      setTimeout(() => startScan(), 500)
                    }}
                    className="flex-1 py-1.5 px-3 text-xs rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    재시작
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
