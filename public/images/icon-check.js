// 아이콘 파일 존재 여부 확인을 위한 스크립트
// 이 파일은 실제로 사용되지 않으며, 배포 시 제거해도 됩니다.
console.log("Checking icon files...")

// 브라우저에서만 실행
if (typeof window !== "undefined") {
  const checkImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const iconPaths = ["/images/logo.png", "/images/icon-192.png", "/images/icon-512.png"]

  Promise.all(iconPaths.map((path) => checkImage(path))).then((results) => {
    iconPaths.forEach((path, index) => {
      console.log(`Icon ${path}: ${results[index] ? "exists" : "missing"}`)
    })
  })
}
