"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Heart,
  TreesIcon as Lungs,
  Droplet,
  AlertTriangle,
  Flame,
  Bone,
  Brain,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function MedicalGuidePage() {
  const [activeTab, setActiveTab] = useState("cpr")

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0)
  }, [])

  return (
    <MobileLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-3">응급처치 가이드</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-3"></div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              응급 상황에서 도움이 될 수 있는 기본적인 응급처치 방법을 안내합니다.
            </p>
          </div>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
            <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
              <CardTitle className="flex items-center text-lg">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                주의사항
              </CardTitle>
              <CardDescription>
                이 가이드는 전문적인 의료 조언을 대체할 수 없습니다. 응급 상황에서는 항상 119에 먼저 연락하세요.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="bg-red-50 p-4 rounded-xl mb-6 flex items-start">
            <CheckCircle2 className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-700 mb-1">응급 상황 체크리스트</h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>주변 안전 확인 (2차 사고 예방)</li>
                <li>환자 상태 확인 (의식, 호흡, 출혈 여부)</li>
                <li>119 신고 (위치, 상황, 환자 상태 전달)</li>
                <li>응급처치 시행 (아래 가이드 참조)</li>
                <li>구급대원 도착 시 상황 설명</li>
              </ol>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="cpr"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
              >
                <Heart className="w-3 h-3 mr-1" />
                심폐소생술
              </TabsTrigger>
              <TabsTrigger
                value="choking"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
              >
                <Lungs className="w-3 h-3 mr-1" />
                기도 막힘
              </TabsTrigger>
              <TabsTrigger
                value="bleeding"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
              >
                <Droplet className="w-3 h-3 mr-1" />
                출혈
              </TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger
                  value="burns"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
                >
                  <Flame className="w-3 h-3 mr-1" />
                  화상
                </TabsTrigger>
                <TabsTrigger
                  value="fracture"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
                >
                  <Bone className="w-3 h-3 mr-1" />
                  골절
                </TabsTrigger>
                <TabsTrigger
                  value="stroke"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  뇌졸중
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="cpr">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
                <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    심폐소생술 (CPR)
                  </CardTitle>
                  <CardDescription>성인 대상 심폐소생술 방법</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src="/cpr-chest-compression.png"
                      alt="심폐소생술 가슴 압박 방법"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-red-600 mb-2">1. 의식 확인</h3>
                      <p className="text-sm text-gray-700">
                        환자의 어깨를 가볍게 두드리며 "괜찮으세요?"라고 물어봅니다. 반응이 없으면 즉시 119에 신고합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-red-600 mb-2">2. 가슴 압박 위치</h3>
                      <p className="text-sm text-gray-700">
                        환자를 바닥에 눕히고, 가슴 중앙(흉골)에 손꿈치를 댑니다. 다른 손을 그 위에 겹쳐 깍지를 낍니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-red-600 mb-2">3. 가슴 압박</h3>
                      <p className="text-sm text-gray-700">
                        팔꿈치를 펴고 어깨와 일직선이 되게 하여 체중을 실어 분당 100-120회 속도로 5-6cm 깊이로
                        압박합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-red-600 mb-2">4. 인공호흡</h3>
                      <p className="text-sm text-gray-700">
                        30회 압박 후, 환자의 머리를 젖히고 턱을 들어 기도를 열어줍니다. 코를 막고 입을 통해 2회 숨을
                        불어넣습니다.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        * 인공호흡에 자신이 없거나 감염 우려가 있는 경우, 가슴 압박만 지속해도 됩니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-red-600 mb-2">5. 반복</h3>
                      <p className="text-sm text-gray-700">
                        30회 가슴 압박과 2회 인공호흡을 구급대원이 도착할 때까지 또는 환자가 의식을 회복할 때까지
                        반복합니다.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-red-50 rounded-xl">
                    <h3 className="font-medium text-red-700 mb-2">AED (자동심장충격기) 사용법</h3>
                    <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                      <li>AED를 가져와 전원을 켭니다.</li>
                      <li>패드를 환자의 가슴에 부착합니다 (그림에 따라 오른쪽 쇄골 아래와 왼쪽 겨드랑이 아래).</li>
                      <li>분석 버튼을 누르고 모두 물러나게 합니다.</li>
                      <li>지시에 따라 충격 버튼을 누릅니다.</li>
                      <li>충격 후 즉시 심폐소생술을 재개합니다.</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">영유아 심폐소생술 차이점</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>영아(1세 미만): 두 손가락으로 가슴 압박, 깊이 4cm, 분당 100-120회</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>유아(1-8세): 한 손 또는 두 손으로 가슴 압박, 깊이 5cm, 분당 100-120회</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>압박:호흡 비율은 30:2 (구조자 1명) 또는 15:2 (구조자 2명)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="choking">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Lungs className="w-4 h-4 mr-2 text-blue-500" />
                    기도 막힘 응급처치
                  </CardTitle>
                  <CardDescription>하임리히 요법(복부 밀어내기)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src="/heimlich-maneuver.png"
                      alt="하임리히 요법 시행 방법"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">1. 상태 확인</h3>
                      <p className="text-sm text-gray-700">
                        환자가 기침을 하거나 말을 할 수 있다면, 자연스럽게 기침하도록 유도합니다. 완전히 막혔다면 즉시
                        조치를 취합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">2. 자세 잡기</h3>
                      <p className="text-sm text-gray-700">
                        환자의 뒤에 서서 양팔로 허리를 감싸 안습니다. 한 손은 주먹을 쥐고 엄지손가락 쪽이 배꼽과 명치
                        사이에 오도록 합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">3. 복부 밀어내기</h3>
                      <p className="text-sm text-gray-700">
                        다른 손으로 주먹을 감싸 쥐고, 빠르게 안쪽과 위쪽으로 밀어 올립니다. 이물질이 나올 때까지
                        반복합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">4. 의식 잃은 경우</h3>
                      <p className="text-sm text-gray-700">
                        환자가 의식을 잃으면 바닥에 눕히고 즉시 119에 신고한 후 심폐소생술을 시작합니다.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-medium text-blue-700 mb-2">영유아 기도 막힘 응급처치</h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p className="font-medium">1세 미만 영아:</p>
                      <ul className="list-disc list-inside pl-2 mb-2">
                        <li>영아를 한쪽 팔에 엎드려 놓고 머리를 아래로 향하게 합니다.</li>
                        <li>등 윗부분을 5회 두드립니다.</li>
                        <li>영아를 뒤집어 가슴 압박을 5회 실시합니다.</li>
                        <li>이물질이 나올 때까지 반복합니다.</li>
                      </ul>

                      <p className="font-medium">1세 이상 아동:</p>
                      <ul className="list-disc list-inside pl-2">
                        <li>성인과 동일한 방법으로 하임리히 요법을 시행하되, 힘을 조절합니다.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bleeding">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Droplet className="w-4 h-4 mr-2 text-green-500" />
                    출혈 응급처치
                  </CardTitle>
                  <CardDescription>심한 출혈 시 응급처치 방법</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src="/bleeding-wound-direct-pressure.png"
                      alt="상처 직접 압박 방법"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-green-600 mb-2">1. 직접 압박</h3>
                      <p className="text-sm text-gray-700">
                        깨끗한 천이나 거즈로 출혈 부위를 직접 압박합니다. 가능하면 멸균 거즈를 사용하고, 없다면 깨끗한
                        천을 사용합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-green-600 mb-2">2. 압박 유지</h3>
                      <p className="text-sm text-gray-700">
                        출혈이 멈출 때까지 최소 15분 이상 지속적으로 압박합니다. 압박하는 동안 상처 부위를 심장보다 높게
                        유지합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-green-600 mb-2">3. 압박 붕대</h3>
                      <p className="text-sm text-gray-700">
                        출혈이 멈추면 압박 붕대로 상처를 감싸 고정합니다. 너무 꽉 감지 않도록 주의하세요.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-green-600 mb-2">4. 쇼크 예방</h3>
                      <p className="text-sm text-gray-700">
                        환자를 눕히고 다리를 약간 높게 유지합니다. 체온 유지를 위해 담요로 덮어줍니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-green-600 mb-2">5. 병원 이송</h3>
                      <p className="text-sm text-gray-700">
                        심한 출혈의 경우 즉시 119에 신고하고 전문적인 치료를 받도록 합니다.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-green-50 rounded-xl">
                    <h3 className="font-medium text-green-700 mb-2">지혈대 사용 지침</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      지혈대는 사지의 심각한 출혈이 직접 압박으로 멈추지 않을 때만 마지막 수단으로 사용합니다.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>출혈 부위보다 심장에 가까운 곳에 적용합니다.</li>
                      <li>단단히 조여 출혈이 멈출 때까지 조입니다.</li>
                      <li>적용 시간을 기록하고, 2시간 이상 사용하지 않습니다.</li>
                      <li>한번 적용한 지혈대는 의료진이 도착할 때까지 풀지 않습니다.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="burns">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Flame className="w-4 h-4 mr-2 text-orange-500" />
                    화상 응급처치
                  </CardTitle>
                  <CardDescription>화상 정도에 따른 응급처치 방법</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src="/burn-treatment-cool-water.png"
                      alt="화상 냉각 처치 방법"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl mb-4">
                    <h3 className="font-medium text-orange-700 mb-2">화상 분류</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        <span className="font-medium">1도 화상:</span> 피부 발적, 통증, 부종
                      </li>
                      <li>
                        <span className="font-medium">2도 화상:</span> 물집, 심한 통증, 붉은 피부
                      </li>
                      <li>
                        <span className="font-medium">3도 화상:</span> 피부 조직 파괴, 검거나 하얀 피부, 감각 상실
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-orange-600 mb-2">1. 화상 부위 냉각</h3>
                      <p className="text-sm text-gray-700">
                        화상 부위를 차가운 흐르는 물에 10-15분간 담그거나 씻습니다. 얼음이나 얼음물은 사용하지 마세요.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-orange-600 mb-2">2. 물집 보호</h3>
                      <p className="text-sm text-gray-700">
                        물집을 터뜨리지 마세요. 깨끗한 거즈나 천으로 느슨하게 덮어 보호합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-orange-600 mb-2">3. 통증 완화</h3>
                      <p className="text-sm text-gray-700">
                        필요시 비처방 진통제를 복용하고, 화상 부위를 심장보다 높게 유지하여 부종을 줄입니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-orange-600 mb-2">4. 병원 치료가 필요한 경우</h3>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>3도 화상</li>
                        <li>넓은 범위의 2도 화상</li>
                        <li>얼굴, 손, 발, 생식기, 관절 부위의 화상</li>
                        <li>화학물질이나 전기에 의한 화상</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-red-50 rounded-xl">
                    <h3 className="font-medium text-red-700 mb-2">화상 시 하지 말아야 할 것</h3>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>버터, 기름, 치약 등을 바르지 마세요.</li>
                      <li>얼음을 직접 대지 마세요.</li>
                      <li>물집을 터뜨리지 마세요.</li>
                      <li>피부에 붙은 옷을 억지로 떼어내지 마세요.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fracture">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Bone className="w-4 h-4 mr-2 text-purple-500" />
                    골절 응급처치
                  </CardTitle>
                  <CardDescription>골절 의심 시 응급처치 방법</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src="/fracture-splinting.png"
                      alt="골절 부위 고정 방법"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl mb-4">
                    <h3 className="font-medium text-purple-700 mb-2">골절 증상</h3>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>심한 통증과 압통</li>
                      <li>부종과 멍</li>
                      <li>변형 (비정상적인 모양)</li>
                      <li>움직임 제한</li>
                      <li>뼈가 피부를 뚫고 나온 경우 (개방성 골절)</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-purple-600 mb-2">1. 부상 부위 고정</h3>
                      <p className="text-sm text-gray-700">
                        부상 부위를 움직이지 않도록 합니다. 골절 부위 위아래 관절까지 포함하여 부목으로 고정합니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-purple-600 mb-2">2. 냉찜질</h3>
                      <p className="text-sm text-gray-700">
                        부종을 줄이기 위해 얼음팩을 수건으로 감싸 부상 부위에 15-20분간 대줍니다.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-purple-600 mb-2">3. 개방성 골절</h3>
                      <p className="text-sm text-gray-700">
                        뼈가 피부를 뚫고 나온 경우, 상처를 깨끗한 거즈로 덮고 출혈을 멈추게 합니다. 뼈를 밀어 넣으려
                        하지 마세요.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-purple-600 mb-2">4. 병원 이송</h3>
                      <p className="text-sm text-gray-700">
                        모든 골절 의심 환자는 X-ray 검사를 위해 병원으로 이송해야 합니다. 심한 통증이나 개방성 골절의
                        경우 119를 부르세요.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                    <h3 className="font-medium text-purple-700 mb-2">임시 부목 만들기</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      전문 부목이 없을 경우 다음과 같은 물건을 활용할 수 있습니다:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>단단한 판자나 두꺼운 잡지</li>
                      <li>말린 신문지나 잡지를 말아서 사용</li>
                      <li>베개나 접은 담요</li>
                      <li>부목을 고정할 끈, 넥타이, 스카프, 벨트 등</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stroke">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white mb-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="w-4 h-4 mr-2 text-blue-500" />
                    뇌졸중 인지 및 대응
                  </CardTitle>
                  <CardDescription>뇌졸중 증상 인지와 초기 대응 방법</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src="/stroke-fast-method.png"
                      alt="뇌졸중 FAST 인지법"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl mb-4">
                    <h3 className="font-medium text-blue-700 mb-2">뇌졸중 FAST 인지법</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        <span className="font-medium">F (Face, 얼굴):</span> 얼굴 한쪽이 처지는지 확인
                      </li>
                      <li>
                        <span className="font-medium">A (Arms, 팔):</span> 한쪽 팔이 아래로 처지는지 확인
                      </li>
                      <li>
                        <span className="font-medium">S (Speech, 말):</span> 말이 어눌하거나 이상한지 확인
                      </li>
                      <li>
                        <span className="font-medium">T (Time, 시간):</span> 증상 발견 시 즉시 119 신고
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">1. 뇌졸중 추가 증상</h3>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>갑작스러운 심한 두통</li>
                        <li>갑작스러운 어지러움, 균형 상실</li>
                        <li>한쪽 또는 양쪽의 시력 저하</li>
                        <li>갑작스러운 혼란, 말하기 또는 이해하기 어려움</li>
                      </ul>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">2. 응급 대응</h3>
                      <p className="text-sm text-gray-700">
                        뇌졸중 의심 증상이 있으면 즉시 119에 신고하세요. 증상 발생 시간을 기록하고 의료진에게
                        알려주세요.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">3. 환자 관리</h3>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>환자를 편안한 자세로 눕히고 머리와 어깨를 약간 높게 유지</li>
                        <li>의식이 있으면 안심시키고 차분하게 대화</li>
                        <li>음식이나 음료를 주지 마세요</li>
                        <li>구토할 경우 기도가 막히지 않도록 옆으로 눕히기</li>
                      </ul>
                    </div>

                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h3 className="font-medium text-blue-600 mb-2">4. 골든타임</h3>
                      <p className="text-sm text-gray-700">
                        뇌졸중은 발생 후 3시간 이내가 치료의 골든타임입니다. 증상 발견 즉시 병원으로 이송하는 것이
                        중요합니다.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-medium text-blue-700 mb-2">심장마비 증상</h3>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>가슴 중앙의 압박감, 쥐어짜는 듯한 통증</li>
                      <li>왼팔, 턱, 목, 등으로 퍼지는 통증</li>
                      <li>호흡곤란, 식은땀, 메스꺼움</li>
                      <li>극심한 피로감, 어지러움</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">자주 묻는 질문</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">심폐소생술 시 가슴 압박만 해도 효과가 있나요?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-700">
                    네, 인공호흡에 자신이 없거나 감염 우려가 있는 경우 가슴 압박만으로도 효과가 있습니다. 이를 '가슴압박
                    소생술(Hands-only CPR)'이라고 하며, 일반인에게 권장되는 방법입니다. 중요한 것은 압박의 깊이(5-6cm)와
                    속도(분당 100-120회)를 유지하는 것입니다.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">자동심장충격기(AED)는 어떻게 사용하나요?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-700">
                    AED는 음성 안내에 따라 사용하면 됩니다. 전원을 켜고, 패드를 환자의 가슴에 부착한 후, 기계가 심장
                    리듬을 분석하도록 합니다. 충격이 필요하다고 판단되면 충격 버튼을 누르라는 안내가 나옵니다. 충격
                    전에는 모든 사람이 환자에게서 떨어져야 합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  화상 시 차가운 물로 식히는 것이 왜 중요한가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-700">
                    화상 부위를 차가운 물로 식히면 조직 손상의 진행을 막고, 통증과 부종을 줄일 수 있습니다. 화상 직후
                    10-15분간 차가운 흐르는 물에 담그는 것이 가장 효과적입니다. 단, 얼음이나 얼음물은 조직 손상을
                    악화시킬 수 있으므로 사용하지 않는 것이 좋습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">뇌졸중과 심장마비의 차이점은 무엇인가요?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-700">
                    뇌졸중은 뇌로 가는 혈류가 차단되거나 뇌 혈관이 파열되어 발생하며, 얼굴 마비, 팔 저림, 말 어눌함 등의
                    증상이 나타납니다. 심장마비는 심장으로 가는 혈류가 차단되어 발생하며, 가슴 통증, 호흡곤란, 식은땀
                    등의 증상이 나타납니다. 두 질환 모두 즉시 119에 신고하고 전문적인 치료를 받아야 합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  응급 상황에서 119에 전화할 때 어떤 정보를 제공해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-700">119에 전화할 때는 다음 정보를 명확하게 전달하세요:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside mt-2">
                    <li>정확한 위치 (주소, 건물명, 층수, 주변 랜드마크)</li>
                    <li>응급 상황의 종류 (사고, 질병 등)</li>
                    <li>환자의 상태 (의식, 호흡, 출혈 여부 등)</li>
                    <li>환자의 수와 나이</li>
                    <li>본인의 이름과 연락처</li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-2">
                    구급대원이 도착할 때까지 전화를 끊지 말고, 추가 지시사항을 따르세요.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-8 p-4 bg-red-50 rounded-xl">
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
              응급 상황 대비 체크리스트
            </h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>가정 내 구급함 구비 (소독제, 붕대, 반창고, 가위, 핀셋 등)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>가족 구성원의 의료 정보를 미리 등록하고, 응급 연락처를 설정해 두세요.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>가까운 병원, 약국 위치 및 연락처 파악</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>응급처치 교육 이수 (대한적십자사 등에서 제공)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>응급 연락처 목록 작성 (가족, 주치의, 이웃 등)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
