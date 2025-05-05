import { PageProps } from "#client/types"
import { useRouterState } from "@tanstack/react-router"

type UseTitlesReturn =
  | {
      pageTitle: string
      seoDescription: string | undefined
      seoTitle: string
    }
  | { pageTitle: undefined; seoDescription: undefined; seoTitle: undefined }

export function useTitles(): UseTitlesReturn {
  const matches: (PageProps | undefined)[] = useRouterState({
    select: (state) =>
      state.matches
        .map((match) =>
          match.loaderData && "pageTitle" in match.loaderData
            ? match.loaderData
            : undefined
        )
        .filter(Boolean),
  })
  console.log({ matches })
  const currentPageMatch = matches.at(-1)
  if (currentPageMatch === undefined)
    return {
      pageTitle: undefined,
      seoDescription: undefined,
      seoTitle: undefined,
    }

  const { pageTitle } = currentPageMatch
  const seoTitle = currentPageMatch.seoTitle ?? pageTitle.replace("*", "")

  const mode = import.meta.env.MODE
  const fullSeoTitle =
    mode === "production"
      ? `${seoTitle} | Ucolorr`
      : `${seoTitle} | Ucolorr [${mode}]`

  return {
    pageTitle,
    seoDescription: currentPageMatch.seoDescription,
    seoTitle: fullSeoTitle,
  }
}
