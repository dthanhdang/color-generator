import React from "react"

import { OtpVerificationErrorMessage } from "./OtpVerificationErrorMessage.js"

export function InvalidOrExpiredCode(): React.JSX.Element {
  return (
    <OtpVerificationErrorMessage>
      This code is invalid or has expired
    </OtpVerificationErrorMessage>
  )
}
