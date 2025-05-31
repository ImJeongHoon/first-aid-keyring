"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">오류가 발생했습니다</h2>

        <p className="text-gray-600 mb-6">
          지도를 불러오는 중 문제가 발생했습니다. 다시 시도하거나 나중에 다시 확인해주세요.
        </p>

        <div className="space-y-3">
          <Button onClick={reset} className="w-full flex items-center justify-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
}
