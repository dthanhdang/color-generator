import * as v from "valibot"

import { useRequiredFieldErrorMessage } from "./useRequiredFieldErrorMessage.js"

export type RequiredStringSchema = v.SchemaWithPipe<
  readonly [v.StringSchema<undefined>, v.NonEmptyAction<string, string>]
>

export function useRequiredStringSchema(): RequiredStringSchema {
  const requiredFieldErrorMessage = useRequiredFieldErrorMessage()

  return v.pipe(v.string(), v.nonEmpty(requiredFieldErrorMessage))
}
