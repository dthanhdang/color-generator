import { AppWrapper as AppWrapperBase } from "#client/components/app_wrapper"
import React, { ComponentProps } from "react"

import { queryClient } from "./queryClient.js"

type TestAppWrapperProps = Omit<
  ComponentProps<typeof AppWrapperBase>,
  "queryClient"
>

export function TestAppWrapper(props: TestAppWrapperProps): React.JSX.Element {
  return <AppWrapperBase {...props} queryClient={queryClient} />
}
