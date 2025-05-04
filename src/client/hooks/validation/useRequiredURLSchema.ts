import * as v from "valibot"

import { useRequiredFieldErrorMessage } from "./useRequiredFieldErrorMessage.js"

export type RequiredURLSchema = v.SchemaWithPipe<
  readonly [
    v.StringSchema<undefined>,
    v.NonEmptyAction<string, string>,
    v.UrlAction<string, string>,
  ]
>

export function useRequiredURLSchema(): RequiredURLSchema {
  const requiredFieldErrorMessage = useRequiredFieldErrorMessage()

  return v.pipe(
    v.string(),
    v.nonEmpty(requiredFieldErrorMessage),
    v.url("This web address is invalid")
  )
}
