import { PageProps } from "#client/types"

export function buildPublicPageProps(
  pageTitle: string,
  rest?: { seoDescription?: string; seoTitle?: string }
): PageProps {
  return {
    crumb: undefined,
    seoDescription: rest?.seoDescription,
    seoTitle: rest?.seoTitle ?? pageTitle.replaceAll("*", ""),
    pageTitle,
  }
}

export function buildAdminPageProps(
  pageTitle: string,
  props?: { crumb: string; seoTitle?: string }
): PageProps {
  return {
    crumb: props?.crumb ?? pageTitle.replaceAll("*", ""),
    seoDescription: undefined,
    seoTitle: props?.seoTitle ?? pageTitle.replaceAll("*", ""),
    pageTitle,
  }
}

export function buildAuthPageProps(
  pageTitle: string,
  props?: { seoTitle?: string }
): PageProps {
  return {
    crumb: undefined,
    seoDescription: undefined,
    seoTitle: props?.seoTitle ?? pageTitle.replaceAll("*", ""),
    pageTitle,
  }
}
