// NFC 관련 유틸리티 함수

// NFC 스캔 콜백 함수
let nfcScanCallback = null

// NFC 지원 여부 확인
export function isNfcSupported() {
  if (typeof window === "undefined") return false

  return !!window.NDEFReader
}

// NFC 스캔 시작
export async function startNfcScan(callback) {
  if (!isNfcSupported()) {
    console.warn("이 기기는 NFC를 지원하지 않습니다.")
    return false
  }

  try {
    const ndef = new window.NDEFReader()
    await ndef.scan()

    nfcScanCallback = callback

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      console.log("NFC 태그가 스캔되었습니다:", serialNumber)

      // 메시지 처리
      const patientId = processNfcMessage(message)

      if (nfcScanCallback) {
        nfcScanCallback({
          success: true,
          serialNumber,
          patientId,
        })
      }
    })

    ndef.addEventListener("error", (error) => {
      console.error("NFC 스캔 오류:", error)

      if (nfcScanCallback) {
        nfcScanCallback({
          success: false,
          error: error.message || "알 수 없는 NFC 오류가 발생했습니다.",
        })
      }
    })

    console.log("NFC 스캔이 시작되었습니다.")
    return true
  } catch (error) {
    console.error("NFC 스캔 시작 실패:", error)

    // 권한 오류 처리
    if (error.name === "NotAllowedError") {
      if (nfcScanCallback) {
        nfcScanCallback({
          success: false,
          error: "NFC 접근 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.",
        })
      }
    } else {
      if (nfcScanCallback) {
        nfcScanCallback({
          success: false,
          error: error.message || "NFC 스캔을 시작할 수 없습니다.",
        })
      }
    }

    return false
  }
}

// NFC 스캔 중지
export function stopNfcScan() {
  nfcScanCallback = null
  console.log("NFC 스캔이 중지되었습니다.")
  // NDEFReader에는 명시적인 중지 메서드가 없으므로 콜백만 제거
}

// NFC 메시지 처리
function processNfcMessage(message) {
  try {
    if (!message || !message.records) {
      return null
    }

    // 텍스트 레코드 찾기
    for (const record of message.records) {
      if (record.recordType === "text") {
        const textDecoder = new TextDecoder()
        const text = textDecoder.decode(record.data)

        // 환자 ID 형식 확인 (예: "patient:12345")
        const match = text.match(/patient:(\w+)/)
        if (match && match[1]) {
          return match[1]
        }
      }
    }

    return null
  } catch (error) {
    console.error("NFC 메시지 처리 오류:", error)
    return null
  }
}

// 테스트용 가짜 NFC 스캔 함수
export function simulateNfcScan(patientId, callback) {
  console.log("가짜 NFC 스캔 시뮬레이션:", patientId)

  setTimeout(() => {
    callback({
      success: true,
      serialNumber: "SIMULATED-NFC-TAG",
      patientId: patientId || "12345",
    })
  }, 500)
}
