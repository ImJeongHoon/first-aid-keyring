"use client";

import api from "@/lib/api"; // 상단 import 추가

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { login, isAuthenticated } = useAuth();

  // 이미 로그인한 경우 리디렉션
  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요");
      return;
    }

    setIsLoading(true);

    try {
      // 🔐 실제 백엔드 로그인 요청
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const token = response.data.token;

      // 🔐 토큰 저장 (localStorage or 쿠키 등 선택 가능)
      localStorage.setItem("token", token);

      // 🧠 auth-context로 사용자 정보 설정
      const userData = { email }; // 간단하게 저장
      login(userData, rememberMe);

      // ✅ 리디렉션
      router.push(redirectPath);
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="flex justify-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                <Image
                  src="/images/logo.png"
                  alt="FirstAidKeyring 로고"
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </Link>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900">
            FirstAidKeyring
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            생명을 지키는 작은 태그
            <br />
            TAG HERE — NFC로 연결되는 응급 정보
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">
              로그인
            </CardTitle>
            <CardDescription className="text-center">
              FirstAidKeyring 서비스 이용을 위해 로그인해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {error && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-50 border-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {redirectPath !== "/" && (
              <Alert className="mb-4 bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700">알림</AlertTitle>
                <AlertDescription className="text-blue-600">
                  이 기능을 사용하려면 로그인이 필요합니다.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  이메일
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    비밀번호
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 sm:h-12 rounded-xl border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition-all duration-200 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "비밀번호 숨기기" : "비밀번호 표시"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  로그인 상태 유지
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <p className="text-xs sm:text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                href={`/register${
                  redirectPath !== "/" ? `?redirect=${redirectPath}` : ""
                }`}
                className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
              >
                회원가입
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
