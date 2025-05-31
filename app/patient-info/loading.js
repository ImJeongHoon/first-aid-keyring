import { MobileLayout } from "@/components/mobile-layout"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <MobileLayout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
          <p className="text-gray-600 text-lg">환자 정보를 불러오는 중...</p>
        </div>
      </div>
    </MobileLayout>
  )
}
