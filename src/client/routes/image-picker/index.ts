import { ImagePicker } from "#pages/image_picker"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/image-picker/")({
  component: ImagePicker,
  loader: () =>
    buildPublicPageProps("Your *Color From Image* Extractor", {
      seoDescription:
        "Quickly and easily generate a color palette by extracting the main components from an image",
    }),
})
