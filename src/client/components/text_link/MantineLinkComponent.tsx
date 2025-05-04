import type { AnchorProps } from "@mantine/core"

import { Anchor } from "@mantine/core"
import * as React from "react"

type MantineAnchorProps = Omit<AnchorProps, "href">

export function MantineLinkComponent(
  props: MantineAnchorProps
): React.JSX.Element {
  return <Anchor {...props} />
}
