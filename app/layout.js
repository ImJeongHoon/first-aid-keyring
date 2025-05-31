import { Inter } from "next/font/google"
import "./globals.css"
import { MobileOptimizations } from "./mobile-optimizations"
import { IconFallback } from "./icon-fallback"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "FirstAidKeyring - NFC 응급 의료 정보 서비스",
  description:
    "NFC 기술을 활용한 응급 의료 정보 서비스로 응급 상황에서 신속하게 중요한 의료 정보에 접근할 수 있습니다.",
  generator: "v0.dev",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={inter.className + " min-h-screen bg-background font-sans antialiased"}>
        <AuthProvider>
          <MobileOptimizations />
          <IconFallback />
          {children}
          <script
            id="naver-map-script-checker"
            dangerouslySetInnerHTML={{
              __html: `
(function() {
  function checkAndRemoveNaverMapScripts() {
    var scripts = document.querySelectorAll('script');
    var naverMapScripts = [];
    
    scripts.forEach(function(script) {
      var src = script.getAttribute('src') || '';
      if (src.includes('map.naver.com') || 
          src.includes('maps.js')) {
        naverMapScripts.push(script);
      }
    });
    
    if (naverMapScripts.length > 1) {
      for (var i = 1; i < naverMapScripts.length; i++) {
        naverMapScripts[i].parentNode.removeChild(naverMapScripts[i]);
      }
    }
  }
  
  // Run immediately
  checkAndRemoveNaverMapScripts();
  
  // Also run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRemoveNaverMapScripts);
  }
})();
`,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
