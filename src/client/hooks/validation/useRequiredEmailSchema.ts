import * as v from "valibot"

import { useRequiredFieldErrorMessage } from "./useRequiredFieldErrorMessage.js"

export type RequiredEmailSchema = v.SchemaWithPipe<
  readonly [
    v.StringSchema<undefined>,
    v.NonEmptyAction<string, string>,
    v.EmailAction<string, string>,
  ]
>

export function useRequiredEmailSchema(): RequiredEmailSchema {
  const requiredFieldErrorMessage = useRequiredFieldErrorMessage()

  return v.pipe(
    v.string(),
    v.nonEmpty(requiredFieldErrorMessage),
    v.email("This e-mail adress is invalid")
  )
}
