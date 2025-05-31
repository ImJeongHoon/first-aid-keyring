"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Copy, ExternalLink } from "lucide-react"

export function NaverMapGuide() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currentDomain = typeof window !== "undefined" ? window.location.origin : ""

  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
      <CardHeader className="bg-gradient-to-r from-red-50 to-white">
        <CardTitle className="text-lg">네이버 지도 API 설정 가이드</CardTitle>
        <CardDescription>네이버 클라우드 플랫폼에서 지도 API를 올바르게 설정하는 방법</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="domain">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="domain">도메인 설정</TabsTrigger>
            <TabsTrigger value="key">API 키 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="domain" className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-amber-800">도메인 설정 필요</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    네이버 클라우드 플랫폼에서 현재 사용 중인 도메인을 허용 목록에 추가해야 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">현재 도메인</h3>
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-gray-100 rounded text-sm flex-1">{currentDomain}</code>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(currentDomain)} className="h-8">
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                <strong>중요:</strong> 와일드카드(*)를 사용하여{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{currentDomain}/*</code>로 등록하세요.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">도메인 설정 방법</h3>
              <ol className="space-y-2 text-sm pl-5 list-decimal">
                <li>
                  <a
                    href="https://www.ncloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline flex items-center"
                  >
                    네이버 클라우드 플랫폼 <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  에 로그인합니다.
                </li>
                <li>
                  콘솔에서 <strong>AI·Application Service</strong> &gt; <strong>Maps</strong>로 이동합니다.
                </li>
                <li>사용 중인 애플리케이션을 선택합니다.</li>
                <li>
                  <strong>Web 서비스 URL</strong> 항목에서 <strong>URL 등록</strong>을 클릭합니다.
                </li>
                <li>
                  현재 URL에 <strong>와일드카드(*)</strong>를 추가하여 등록합니다. (예: https://example.com/*)
                </li>
                <li>변경사항이 적용되는데 최대 5분 정도 소요될 수 있습니다.</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="key" className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-amber-800">API 키 확인 필요</h4>
                  <p className="text-sm text-amber-700 mt-1">API 키가 올바르게 설정되어 있는지 확인하세요.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">API 키 확인 방법</h3>
              <ol className="space-y-2 text-sm pl-5 list-decimal">
                <li>
                  <a
                    href="https://www.ncloud.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline flex items-center"
                  >
                    네이버 클라우드 플랫폼 <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  에 로그인합니다.
                </li>
                <li>
                  콘솔에서 <strong>AI·Application Service</strong> &gt; <strong>Maps</strong>로 이동합니다.
                </li>
                <li>
                  사용 중인 애플리케이션의 <strong>Client ID</strong>를 확인합니다.
                </li>
                <li>
                  이 Client ID가 환경 변수{" "}
                  <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID</code>에
                  설정되어 있는지 확인합니다.
                </li>
                <li>Vercel에 배포한 경우, Vercel 대시보드에서 프로젝트 설정 &gt; 환경 변수에서 확인하세요.</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">API 사용량 확인</h3>
              <p className="text-sm">
                네이버 클라우드 플랫폼 콘솔에서 Maps 서비스의 <strong>이용 내역</strong> 탭에서 API 사용량을 확인할 수
                있습니다.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a
            href="https://guide.ncloud-docs.com/docs/maps-overview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            공식 문서 <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href="https://console.ncloud.com/ai-application-service/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            네이버 클라우드 콘솔 <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
