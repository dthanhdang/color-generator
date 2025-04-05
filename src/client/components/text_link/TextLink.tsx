import { LinkComponent } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import type { MantineAnchorProps } from "./MantineLinkComponent.jsx";

import { CreatedLinkComponent } from "./CreatedLinkComponent.js";
import { MantineLinkComponent } from "./MantineLinkComponent.jsx";

// Cf https://tanstack.com/router/latest/docs/framework/react/guide/custom-link

export const TextLink: LinkComponent<typeof MantineLinkComponent> = ({
  className,
  ...props
}: MantineAnchorProps) => {
  return (
    // @ts-expect-error 2322 Doesn't work since upgrading to React 19
    <CreatedLinkComponent
      {...props}
      className={twMerge(
        "font-bold text-blue-500 underline decoration-dotted",
        className
      )}
    />
  );
};
