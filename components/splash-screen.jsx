"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HeartLogo } from "./heart-logo"

export function SplashScreen({ onComplete, duration = 2000 }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 300) // 페이드 아웃 애니메이션 후 콜백 실행
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-white to-red-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center">
        {/* 로고 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="relative mb-6"
        >
          <div className="relative">
            <HeartLogo width={96} height={96} className="text-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
          </div>
        </motion.div>

        {/* 앱 이름 */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          FirstAidKeyring
        </motion.h1>

        {/* 태그라인 */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-600 mb-8"
        >
          NFC 응급 의료 정보 서비스
        </motion.p>

        {/* 로딩 바 */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.7, duration: (duration * 0.8) / 1000 }}
          className="w-48 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
        />
      </div>
    </motion.div>
  )
}
