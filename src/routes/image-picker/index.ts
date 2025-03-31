import { ImagePicker } from "#pages/image_picker"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/image-picker/")({
  component: ImagePicker,
})
