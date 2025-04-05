import { ImagePicker } from "#pages/image_picker"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/image-picker/")({
  component: ImagePicker,
  loader: () => ({
    crumb: "Image picker",
    seoDescription:
      "Quickly and easily generate a color palette by extracting the main components from an image",
    seoTitle: "Your Color From Image generator",
  }),
})
