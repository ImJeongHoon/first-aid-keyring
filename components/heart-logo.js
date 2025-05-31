import Image from "next/image"

export function HeartLogo({ className, width = 40, height = 40 }) {
  return (
    <div className={`relative ${className || ""}`}>
      <Image
        src="/images/logo.png"
        alt="FirstAidKeyring 로고"
        width={width}
        height={height}
        priority
        unoptimized // 이미지 최적화 비활성화로 로딩 문제 해결
      />
    </div>
  )
}
