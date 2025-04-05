import type { JSX, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Titles } from "./Titles.jsx";

type PageProps = {
  asCard?: boolean;
  children: ReactNode;
  className?: string;
  displayTitle?: boolean;
};

export function Page({
  asCard = false,
  children,
  className,
  displayTitle = true,
}: PageProps): JSX.Element {
  return (
    <main
      className={twMerge(
        "flex flex-col p-3 lg:p-5 grow",
        asCard && "lg:shadow-sm lg:w-4/6 lg:mx-auto",
        className
      )}
    >
      <Titles displayTitle={displayTitle} />

      {children}
    </main>
  );
}
