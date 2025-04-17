import { Button, Stack, Paper, Text } from "@mantine/core"
import type { JSX, RefObject } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"

type ImageUploadProps = {
  imgRef: RefObject<HTMLImageElement | null>
}

export function ImageUploader({ imgRef }: ImageUploadProps): JSX.Element {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      if (imgRef.current) URL.revokeObjectURL(imgRef.current.src)
      if (imgRef.current) imgRef.current.src = URL.createObjectURL(file)
    }
  }

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
          <Upload size={24} color="#868e96" />
          <Text>
            {isDragActive
              ? "Drop your image here"
              : "Drag and drop your image or browse an image"}
          </Text>
          <Text size="sm" c="dimmed">
            PNG, JPG, GIF to 5MB
          </Text>
        </Stack>
      </div>
      <Button>Pick an image</Button>
    </Paper>
  )
}
