"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Lock, LogOut } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteAccount = () => {
    // 실제 계정 삭제 로직 구현
    console.log("계정 삭제 처리")
    // 삭제 후 로그인 페이지로 리디렉션
    router.push("/login")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">뒤로 가기</span>
        </Button>
        <h1 className="text-2xl font-bold">설정</h1>
      </div>

      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <User className="h-5 w-5 mr-2 text-green-500" />
              계정 관리
            </CardTitle>
            <CardDescription>계정 정보 및 보안 설정을 관리합니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <Link href="/change-password" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="h-4 w-4 mr-2 text-green-600" />
                비밀번호 변경
              </Button>
            </Link>
            <Link href="/logout" className="block">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2 text-amber-600" />
                로그아웃
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="w-full justify-start mt-4"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              계정 삭제
            </Button>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              계정 삭제
            </AlertDialogTitle>
            <AlertDialogDescription>
              정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 개인 정보와 의료 기록이 영구적으로
              삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
              계정 삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
