"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Loading from "./loading"

// 클라이언트 사이드에서만 로드되도록 dynamic import 사용
const AEDMapClient = dynamic(() => import("./aed-map-client"), {
  ssr: false,
  loading: () => <Loading />,
})

export default function AEDMapClientWrapper() {
  return (
    <div className="flex flex-col h-screen">
      <Suspense fallback={<Loading />}>
        <AEDMapClient />
      </Suspense>
    </div>
  )
}
