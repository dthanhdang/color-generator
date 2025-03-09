import { useEffect, useRef } from "react"

type ImageCanvasProps = {
  imageFile: File | null
  onColorSelect: (color: string) => void
}

export function ImageCanvas({ imageFile, onColorSelect }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imageFile || !canvasRef.current || !imgRef.current) return

    const img = imgRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)
    }

    const imageUrl = URL.createObjectURL(imageFile)
    img.src = imageUrl

    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageFile])

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!canvasRef.current || !imgRef.current || !imgRef.current.complete)
      return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = imgRef.current

    if (!ctx) return

    const rect = img.getBoundingClientRect()
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height

    const x = Math.floor((event.clientX - rect.left) * scaleX)
    const y = Math.floor((event.clientY - rect.top) * scaleY)

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`

    // Dessiner un cercle pour indiquer la sélection
    /*ctx.beginPath()*/

    ctx.strokeStyle = "white"
    ctx.lineWidth = 2

    ctx.arc(x, y, 10, 0, 2 * Math.PI)

    ctx.fillStyle = "red"
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.stroke()

    onColorSelect(color)
  }

  return (
    <div className="relative w-full flex-cols justify-center mt-4">
      <img
        ref={imgRef}
        src={imageFile ? URL.createObjectURL(imageFile) : ""}
        alt="Uploaded"
        className="max-w-full max-h-[400px] rounded-lg shadow-md cursor-pointer"
        onClick={handleClick}
      />

      <canvas
        className="max-w-full max-h-[400px] rounded-lg shadow-md cursor-pointer"
        ref={canvasRef}
      />
    </div>
  )
}
