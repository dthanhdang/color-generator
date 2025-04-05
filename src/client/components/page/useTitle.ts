import { useRouterState } from "@tanstack/react-router";

type UseTitleReturn = {
  browserTitle: string;
  pageTitle: string;
};

export function useTitle(): undefined | UseTitleReturn {
  const titles = useRouterState({
    select: (state) =>
      state.matches
        .map((match) =>
          match.loaderData && "title" in match.loaderData
            ? match.loaderData.title
            : undefined
        )
        .filter(Boolean),
  });
  const pageTitle = titles.at(-1);
  if (pageTitle === undefined) return undefined;

  const mode = import.meta.env.MODE;
  const browserTitle =
    mode === "production"
      ? `${pageTitle} | ChromaGen`
      : `${pageTitle} | ChromaGen [${mode}]`;

  return { browserTitle, pageTitle };
}
