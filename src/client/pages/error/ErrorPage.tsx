import { HTTPError } from "#client/rpc/custom_fetch"
import { useErrorLogo } from "#components/error_logo/useErrorLogo.tsx"
import { TextLink } from "#components/text_link/TextLink.tsx"
import { Stack } from "@mantine/core"
import type { ErrorComponentProps } from "@tanstack/react-router"
import type { JSX } from "react"

export function ErrorPage({ error }: ErrorComponentProps): JSX.Element {
  const { logo, regenerateButton } = useErrorLogo({
    buttonLabel: "generate random palettes",
    errorMessage: "Oooooops",
    harmonyType: "analogous",
  })

  const errorMessage =
    error.cause && error instanceof HTTPError
      ? "An error happened while contacting our servers. Please try again in a few moments."
      : "An error occured. Please try again in a few moments"

  return (
    <Stack className="mt-20 flex flex-col items-center">
      {logo}

      <div className="flex flex-col">
        <p>{errorMessage}</p>
        <p className="mb-5">
          <span>Meanwhile, why not </span>
          {regenerateButton}
          <span> for this page ?</span>
        </p>

        <p>
          Still not working ? <TextLink to="/contact">Let us know</TextLink>
        </p>
      </div>
    </Stack>
  )
}
