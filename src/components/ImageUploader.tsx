import { Button, Image, Stack, Paper, Text, rem } from "@mantine/core"
import { useCallback } from "react"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"

type ImageUploadProps = {
  onImageUpload: (image: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
          onImageUpload(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".gif"] },
    maxFiles: 1,
  })
  return (
    <Paper
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />

      <div>
        <Stack>
          {preview ? (
            <Image src={preview} alt="Preview" maw={rem(200)} radius="md" />
          ) : (
            <Upload size={rem(48)} color="#868e96" />
          )}
          <Text>
            {isDragActive
              ? "Drop your image here"
              : "Drag and drop your image or browse an image"}
          </Text>
          <Text size="sm" color="dimmed">
            PNG, JPG, GIF jusqu'à 5MB
          </Text>
        </Stack>
      </div>
      <Button>Pick an image</Button>
    </Paper>
  )
}
