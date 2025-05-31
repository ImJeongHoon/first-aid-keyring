"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addressToCoords } from "@/utils/geocoding-utils"

export function AddressSearch({ onSearch, onClear, isLoading = false }) {
  const [query, setQuery] = useState("")
  const [searchHistory, setSearchHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef(null)
  const historyRef = useRef(null)

  // 로컬 스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem("addressSearchHistory")
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 5))
      } catch (e) {
        console.error("검색 기록을 불러오는데 실패했습니다:", e)
      }
    }
  }, [])

  // 검색 기록 저장
  const saveToHistory = (address) => {
    if (!address.trim()) return

    const newHistory = [address, ...searchHistory.filter((item) => item !== address)].slice(0, 5)

    setSearchHistory(newHistory)
    localStorage.setItem("addressSearchHistory", JSON.stringify(newHistory))
  }

  // 검색 처리
  const handleSearch = async () => {
    if (!query.trim() || isSearching) return

    setIsSearching(true)

    try {
      const result = await addressToCoords(query)
      saveToHistory(query)

      if (onSearch) {
        onSearch({
          lat: result.y,
          lng: result.x,
          address: result.roadAddress || result.jibunAddress,
        })
      }

      setQuery("")
    } catch (error) {
      console.error("주소 검색 오류:", error)
      alert(`검색 중 오류가 발생했습니다: ${error.message}`)
    } finally {
      setIsSearching(false)
      setShowHistory(false)
    }
  }

  // 검색 기록에서 선택
  const selectFromHistory = async (address) => {
    setQuery(address)
    setShowHistory(false)

    try {
      setIsSearching(true)
      const result = await addressToCoords(address)

      if (onSearch) {
        onSearch({
          lat: result.y,
          lng: result.x,
          address: result.roadAddress || result.jibunAddress,
        })
      }
    } catch (error) {
      console.error("주소 검색 오류:", error)
      alert(`검색 중 오류가 발생했습니다: ${error.message}`)
    } finally {
      setIsSearching(false)
    }
  }

  // 검색 기록 삭제
  const removeFromHistory = (e, address) => {
    e.stopPropagation()
    const newHistory = searchHistory.filter((item) => item !== address)
    setSearchHistory(newHistory)
    localStorage.setItem("addressSearchHistory", JSON.stringify(newHistory))
  }

  // 검색 초기화
  const handleClear = () => {
    setQuery("")
    if (onClear) onClear()
  }

  // 외부 클릭 시 검색 기록 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        historyRef.current &&
        !historyRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowHistory(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 p-2 bg-white z-10 shadow-sm">
        <div className="relative flex-1" ref={inputRef}>
          <Input
            className="pr-8"
            placeholder="주소 또는 장소 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            disabled={isSearching || isLoading}
          />
          {query && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isSearching || isLoading}
          className="bg-red-500 hover:bg-red-600"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>

        <Button variant="outline" onClick={handleClear} disabled={isLoading}>
          초기화
        </Button>
      </div>

      {/* 검색 기록 */}
      {showHistory && searchHistory.length > 0 && (
        <div
          ref={historyRef}
          className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md z-20 mt-1 max-h-60 overflow-y-auto"
        >
          <div className="p-2 border-b text-sm font-medium text-gray-500">최근 검색</div>
          <ul>
            {searchHistory.map((address, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectFromHistory(address)}
              >
                <span className="truncate">{address}</span>
                <button
                  className="text-gray-400 hover:text-gray-600 ml-2"
                  onClick={(e) => removeFromHistory(e, address)}
                  aria-label="검색 기록 삭제"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
