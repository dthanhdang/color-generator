import { ContactPage } from "#pages/contact"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/contact/")({
  component: ContactPage,
  loader: () =>
    buildPublicPageProps("Contact", {
      seoDescription:
        "Get in touch if you want to offer a suggestion or encounter a problem while using our color generator",
    }),
})
