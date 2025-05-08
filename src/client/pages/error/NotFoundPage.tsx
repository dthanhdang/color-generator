import { useErrorLogo } from "#components/error_logo/useErrorLogo.tsx"
import { TextLink } from "#components/text_link/TextLink.tsx"
import { Stack } from "@mantine/core"
import type { JSX } from "react"

export function NotFoundPage(): JSX.Element {
  const { logo, regenerateButton } = useErrorLogo({
    buttonLabel: "generating random palettes",
    harmonyType: "split-complementary",
    errorMessage: "404",
  })

  return (
    <Stack className="mt-20 flex flex-col items-center justify-around">
      {logo}

      <div className="flex flex-col">
        <p className="mb-5">We couldn't find what you're looking for :'(</p>

        <p>
          You may <TextLink to="/">return home</TextLink>
        </p>
        <p>
          <span>...or have fun </span>
          {regenerateButton}
          <span> for this page</span>
        </p>
      </div>
    </Stack>
  )
}
