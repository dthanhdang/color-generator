import type { ReactNode } from "react"

import React from "react"

type OtpVerificationErrorMessageProps = {
  children: ReactNode
}

export function OtpVerificationErrorMessage({
  children,
}: OtpVerificationErrorMessageProps): React.JSX.Element {
  return <p className="mx-auto text-red-600">{children}</p>
}
