import { useCallback, useEffect, useRef, useState } from "react"

type ImageCanvasProps = {
  imageFile: File | null
  onColorSelect: (color: string) => void
}

type SelectedPoint = {
  x: number
  y: number
  color: string
}

export function ImageCanvas({ imageFile, onColorSelect }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [selectedPoints, setSelectedPoints] = useState<SelectedPoint[]>([])
  const [currentPoint, setCurrentPoint] = useState<SelectedPoint | null>(null)

  const selectedPointsRef = useRef<SelectedPoint[]>([])
  const currentPointRef = useRef<SelectedPoint | null>(null)

  // Mettre à jour les refs quand les états changent
  useEffect(() => {
    selectedPointsRef.current = selectedPoints
  }, [selectedPoints])

  useEffect(() => {
    currentPointRef.current = currentPoint
  }, [currentPoint])

  // Définir redrawCanvas comme un useCallback pour éviter les recréations inutiles
  const redrawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      // Redessiner l'image de base
      ctx.drawImage(img, 0, 0)

      // Dessiner tous les points précédemment sélectionnés en utilisant la ref
      selectedPointsRef.current.forEach((point) => {
        drawSelectionCircle(ctx, point.x, point.y, point.color)
      })

      // Dessiner le point courant s'il existe en utilisant la ref
      if (currentPointRef.current) {
        drawSelectionCircle(
          ctx,
          currentPointRef.current.x,
          currentPointRef.current.y,
          currentPointRef.current.color
        )
      }
    },
    []
  )

  // Dessiner un cercle de sélection
  const drawSelectionCircle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
      // Cercle externe blanc
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, 2 * Math.PI)
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()

      // Cercle interne avec la couleur sélectionnée
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
    },
    []
  )
  useEffect(() => {
    if (!imageFile || !canvasRef.current || !imgRef.current) return

    const img = imgRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      redrawCanvas(ctx, img)
    }

    const imageUrl = URL.createObjectURL(imageFile)
    img.src = imageUrl

    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageFile, redrawCanvas])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !imgRef.current || !imgRef.current.complete)
        return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const img = imgRef.current

      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = img.naturalWidth / rect.width
      const scaleY = img.naturalHeight / rect.height

      const x = Math.floor((event.clientX - rect.left) * scaleX)
      const y = Math.floor((event.clientY - rect.top) * scaleY)

      const pixel = ctx.getImageData(x, y, 1, 1).data
      const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`

      // Ajouter le nouveau point à la liste
      const newPoint = { x, y, color }
      setCurrentPoint(newPoint)
      setSelectedPoints((prev) => [...prev, newPoint])

      // Redessiner le canvas avec tous les points
      redrawCanvas(ctx, img)

      // Informer le parent de la couleur sélectionnée
      onColorSelect(color)
    },
    [redrawCanvas, onColorSelect]
  )

  return (
    <div className="relative w-full flex justify-center mt-4">
      {imageFile && (
        <>
          <img
            ref={imgRef}
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            className="hidden" // Image cachée, utilisée uniquement pour le chargement
          />
          <canvas
            className="max-w-full max-h-[400px] rounded-lg shadow-md cursor-pointer"
            ref={canvasRef}
            onClick={handleClick}
          />
        </>
      )}
    </div>
  )
}
