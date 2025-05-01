import { ContrastCheckerPage } from "#pages/contrast_checker"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/contrast-checker/")({
  component: ContrastCheckerPage,
  loader: () => ({
    crumb: "Contrast checker",
    seoDescription:
      "Easily test and improve text-to-background color contrast and accessiblity with our Contrast Color Checker. Ensure WCAG accessibility compliance and optimize your color palette for UI/UX design.",
    seoTitle: "Your Color Contrast Checker",
  }),
})
