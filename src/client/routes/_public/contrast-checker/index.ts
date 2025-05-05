import { ContrastCheckerPage } from "#pages/contrast_checker"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/contrast-checker/")({
  component: ContrastCheckerPage,
  loader: () =>
    buildPublicPageProps("Your *Color Contrast* Checker", {
      seoDescription:
        "Easily test and improve text-to-background color contrast and accessiblity with our Contrast Color Checker. Ensure WCAG accessibility compliance and optimize your color palette for UI/UX design.",
    }),
})
