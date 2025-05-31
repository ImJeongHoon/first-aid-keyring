"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation, Phone } from "lucide-react"
import { formatDistance } from "@/utils/location-utils"

export function AEDInfoCard({ aed, onNavigate, isSelected = false }) {
  // 거리 형식화
  const distance = aed.distance ? formatDistance(aed.distance) : "거리 정보 없음"

  return (
    <Card
      className={`mb-4 overflow-hidden transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-red-500 shadow-md" : "border-gray-200"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{aed.name}</h3>
        </div>

        <div className="text-gray-600 mb-3">
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="mr-2">
              {distance}
            </Badge>

            {aed.manager && <Badge variant="outline">관리자: {aed.manager}</Badge>}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button
            variant="default"
            className="flex-1 bg-red-500 hover:bg-red-600"
            onClick={() => onNavigate(aed.coordinates.lat, aed.coordinates.lng)}
          >
            <Navigation className="h-4 w-4 mr-2" />길 안내
          </Button>

          {aed.phoneNumber && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => (window.location.href = `tel:${aed.phoneNumber}`)}
            >
              <Phone className="h-4 w-4 mr-2" />
              전화
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
