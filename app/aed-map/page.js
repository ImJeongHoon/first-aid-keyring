import { Suspense } from "react"
import Loading from "./loading"
import AEDMapClientWrapper from "./client-wrapper"
import { BottomNav } from "@/components/bottom-nav"

export const metadata = {
  title: "AED 위치 찾기 | 응급처치 키링",
  description: "주변 AED(자동심장충격기) 위치를 찾고 길 안내를 받으세요.",
}

export default function AEDMapPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-var(--app-bottom-nav-height))]">
      <Suspense fallback={<Loading />}>
        <AEDMapClientWrapper />
      </Suspense>
      <BottomNav />
    </div>
  )
}
