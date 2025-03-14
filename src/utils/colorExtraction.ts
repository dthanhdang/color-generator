import ColorThief from "colorthief"
import { rgbToHex } from "./colorConverters"

export async function getDominantColors(
  image: HTMLImageElement,
  colorCount: number
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const colorThief = new ColorThief()

    const extractColors = () => {
      try {
        const palette = colorThief.getPalette(image, colorCount)
        const colors = palette.map((rgb) => rgbToHex(rgb[0], rgb[1], rgb[2]))
        console.log("Colors extracted successfully:", colors)
        resolve(colors)
      } catch (error) {
        console.error("ColorThief failed:", error)

        try {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            console.error("Error while creating context canvas")
            reject(new Error("Failed to create canvas context"))
            return
          }

          canvas.width = image.naturalWidth
          canvas.height = image.naturalHeight
          ctx.drawImage(image, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

          const colors: string[] = []
          const pixelCount = imageData.data.length / 4
          const sampleSize = Math.max(1, Math.floor(pixelCount / colorCount))

          for (let i = 0; i < colorCount; i++) {
            const pixelIndex = i * sampleSize * 4
            if (pixelIndex < imageData.data.length) {
              const r = imageData.data[pixelIndex]
              const g = imageData.data[pixelIndex + 1]
              const b = imageData.data[pixelIndex + 2]
              colors.push(rgbToHex(r, g, b))
            }
          }

          console.log("Colors extracted manually:", colors)
          resolve(colors)
        } catch (fallbackError: unknown) {
          console.error("Fallback method also failed:", fallbackError)

          if (fallbackError instanceof Error) {
            reject(
              new Error(
                `Color extraction failed completely: ${fallbackError.message}`
              )
            )
          } else {
            reject(
              new Error(
                `Color extraction failed completely: ${String(fallbackError)}`
              )
            )
          }
        }
      }
    }

    if (image.complete && image.naturalHeight !== 0) {
      extractColors()
    } else {
      image.crossOrigin = "Anonymous"

      image.onload = extractColors

      image.onerror = (e) => {
        console.error("Error loading the image:", e)
        reject(
          new Error(
            `Failed to load image: ${e instanceof Error ? e.message : String(e)}`
          )
        )
      }
    }
  })
}

export function generateRandomColor(): string {
  const letters = "0123456789ABCDEF"
  let color = "#"

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function getRandomPaletteMode(): "scale" | "harmony" {
  return Math.random() > 0.5 ? "scale" : "harmony"
}
