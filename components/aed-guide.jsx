"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AEDGuide() {
  const [activeTab, setActiveTab] = useState("usage")

  return (
    <div className="aed-guide">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="usage">사용 방법</TabsTrigger>
          <TabsTrigger value="caution">주의사항</TabsTrigger>
          <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AED 사용 단계</h3>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-red-600 mb-2">1단계: AED 준비</h4>
              <p className="text-gray-700">AED를 가져와 환자 옆에 놓고 전원 버튼을 누릅니다.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-red-600 mb-2">2단계: 패드 부착</h4>
              <p className="text-gray-700">환자의 상의를 벗기고 패드를 포장지에 그려진 위치에 부착합니다.</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>오른쪽 쇄골 아래</li>
                <li>왼쪽 겨드랑이 아래 옆구리</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-red-600 mb-2">3단계: 심장 리듬 분석</h4>
              <p className="text-gray-700">
                AED가 자동으로 심장 리듬을 분석합니다. 이때 환자에게 접촉하지 않도록 주의하세요.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-red-600 mb-2">4단계: 제세동(필요한 경우)</h4>
              <p className="text-gray-700">
                AED가 제세동이 필요하다고 판단하면 충전 후 제세동 버튼을 누르라고 안내합니다. 이때 아무도 환자에게
                접촉하지 않도록 확인하세요.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-red-600 mb-2">5단계: 즉시 CPR 재개</h4>
              <p className="text-gray-700">제세동 후 즉시 CPR을 재개하고 AED의 지시에 따릅니다.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="caution" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AED 사용 시 주의사항</h3>

            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">물기가 있는 환자에게 사용할 경우 물기를 제거한 후 사용하세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">금속 표면이나 물웅덩이 위에서 사용하지 마세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">환자의 가슴에 약물 패치가 있다면 제거 후 사용하세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">심장 리듬 분석 중이나 제세동 시 환자에게 접촉하지 마세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">
                  8세 미만 또는 25kg 미만의 소아에게는 소아용 패드를 사용하세요. 소아용 패드가 없다면 성인용 패드로
                  대체할 수 있습니다.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">패드 부착 부위에 땀, 물, 흉모가 많으면 제거 후 사용하세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-700">
                  AED 사용 중에도 119에 신고하고 구급대원이 도착할 때까지 CPR과 AED 사용을 반복하세요.
                </span>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>AED는 누구나 사용할 수 있나요?</AccordionTrigger>
              <AccordionContent>
                네, AED는 일반인도 사용할 수 있도록 설계되었습니다. 음성 안내에 따라 사용하면 됩니다. 사용자의 판단이
                필요한 부분은 최소화되어 있습니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>AED를 사용하다가 실수로 잘못 사용하면 어떻게 되나요?</AccordionTrigger>
              <AccordionContent>
                AED는 심장 리듬을 자동으로 분석하여 제세동이 필요한 경우에만 충전됩니다. 제세동이 필요하지 않은
                환자에게는 제세동 버튼을 눌러도 작동하지 않습니다. 따라서 AED 사용으로 인한 추가 손상 위험은 매우
                낮습니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>AED 사용 후 패드는 어떻게 해야 하나요?</AccordionTrigger>
              <AccordionContent>
                구급대원이 도착하면 AED 사용 사실을 알리고, 패드는 부착된 상태로 두세요. 구급대원이 제거할 것입니다. AED
                기기는 관리자에게 반납하면 됩니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>임산부에게도 AED를 사용할 수 있나요?</AccordionTrigger>
              <AccordionContent>
                네, 임산부에게도 AED를 사용할 수 있습니다. 심정지 상태의 임산부와 태아 모두를 위해 일반적인 방법대로
                AED를 사용하세요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>AED 패드 부착 위치를 정확히 모르면 어떻게 하나요?</AccordionTrigger>
              <AccordionContent>
                AED 패드에는 부착 위치가 그림으로 표시되어 있습니다. 일반적으로 오른쪽 쇄골 아래와 왼쪽 겨드랑이 아래
                옆구리에 부착합니다. 패드 그림을 참고하여 부착하세요.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}
