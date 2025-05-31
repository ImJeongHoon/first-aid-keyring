"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("이메일을 입력해주세요")
      return
    }

    try {
      setIsLoading(true)
      // 여기에 실제 비밀번호 재설정 이메일 전송 로직이 들어갑니다
      await new Promise((resolve) => setTimeout(resolve, 1500)) // 로딩 시뮬레이션
      setIsSubmitted(true)
    } catch (err) {
      setError("비밀번호 재설정 이메일 전송에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">뒤로 가기</span>
        </Button>
        <h1 className="text-2xl font-bold">비밀번호 찾기</h1>
      </div>

      <Card className="border-0 shadow-md">
        {!isSubmitted ? (
          <>
            <CardHeader>
              <CardTitle>비밀번호를 잊으셨나요?</CardTitle>
              <CardDescription>가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "처리 중..." : "비밀번호 재설정 링크 받기"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center">이메일이 전송되었습니다</CardTitle>
              <CardDescription className="text-center">
                {email}로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-gray-500">
              <p>이메일이 도착하지 않았나요?</p>
              <p>스팸 폴더를 확인하시거나 몇 분 후에 다시 시도해주세요.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                다시 시도하기
              </Button>
            </CardFooter>
          </>
        )}
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-gray-500">
            <Link href="/login" className="text-blue-600 hover:underline">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
