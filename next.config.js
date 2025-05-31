/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "vercel.app"],
    unoptimized: true,
  },
  // 정적 내보내기 비활성화
  output: "standalone",
  env: {
    // 환경 변수 이름 통일: NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID (복수형 MAPS)
    NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID,
    // 이전 환경 변수는 제거 (단일 환경 변수 사용)
  },
  // 특정 페이지를 정적 생성에서 제외
  experimental: {
    // 정적 페이지 생성 제외 목록
    excludeDefaultMomentLocales: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
