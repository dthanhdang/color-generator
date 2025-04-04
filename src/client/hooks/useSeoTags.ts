import { isMatch, useMatches } from "@tanstack/react-router"

type UseSeoTagsReturn = {
  seoDescription: string | undefined
  seoTitle: string | undefined
}

export function useSeoTags(): undefined | UseSeoTagsReturn {
  const matches = useMatches()

  if (matches.some((match) => match.status === "pending")) return undefined

  const matchesWithSeoDescription = matches.filter((match) =>
    isMatch(match, "loaderData.seoDescription")
  )
  const matchesWithSeoTitle = matches.filter((match) =>
    isMatch(match, "loaderData.seoTitle")
  )
  const matchesWithPageTitle = matches.filter((match) =>
    isMatch(match, "loaderData.pageTitle")
  )

  return {
    seoTitle:
      matchesWithSeoTitle.at(-1)?.loaderData?.seoTitle ??
      matchesWithPageTitle.at(-1)?.loaderData?.pageTitle,
    seoDescription:
      matchesWithSeoDescription.at(-1)?.loaderData?.seoDescription,
  }
}
