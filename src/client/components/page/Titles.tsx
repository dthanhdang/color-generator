import React from "react";

import { useTitle } from "./useTitle.js";

type TitlesProps = {
  displayTitle?: boolean;
};

export function Titles({
  displayTitle = true,
}: TitlesProps): null | React.JSX.Element {
  const titles = useTitle();

  if (!titles) return null;

  const { browserTitle, pageTitle } = titles;

  return (
    <>
      <title>{browserTitle}</title>

      {displayTitle ? <h1 className="mb-5 text-center">{pageTitle}</h1> : null}
    </>
  );
}
