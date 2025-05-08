import { TextLink } from "#client/components/text_link"
import { Breadcrumbs as BreadcrumbsBase } from "@mantine/core"
import { useMatches } from "@tanstack/react-router"
import type { JSX } from "react"

type BreadcrumbsProps = {
  className?: string
}

export function Breadcrumbs({
  className,
}: BreadcrumbsProps): null | JSX.Element {
  const matches = useMatches()

  if (matches.some((match) => match.status === "pending")) return null

  const matchesWithCrumbs = matches
    .map((match) =>
      match.loaderData && "crumb" in match.loaderData
        ? { label: match.loaderData.crumb, path: match.fullPath }
        : undefined
    )
    .filter((match) => match !== undefined)

  const parentCrumbs = matchesWithCrumbs.slice(0, -1)
  const currentCrumb = matchesWithCrumbs.at(-1)

  return (
    <BreadcrumbsBase className={className}>
      {parentCrumbs.map((item) => (
        <TextLink from={item.path} key={item.path}>
          {item.label}
        </TextLink>
      ))}
      {currentCrumb ? <span>{currentCrumb.label}</span> : null}
    </BreadcrumbsBase>
  )
}
