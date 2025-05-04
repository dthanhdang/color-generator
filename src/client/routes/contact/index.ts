import { ContactPage } from "#pages/contact"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
  loader: () => ({
    crumb: "Contact",
    seoDescription:
      "Get in touch if you want to offer a suggestion or encounter a problem while using our color generator",
    seoTitle: "Contact",
  }),
})
