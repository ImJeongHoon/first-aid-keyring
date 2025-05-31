"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { MobileLayout } from "@/components/mobile-layout"

export default function Error({ error, reset }) {
  useEffect(() => {
    // 오류 로깅
    console.error("환자 정보 페이지 오류:", error)
  }, [error])

  return (
    <MobileLayout>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">
            페이지를 로드하는 중 문제가 발생했습니다. 다시 시도하거나 홈으로 돌아가세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
            >
              다시 시도
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
            >
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
