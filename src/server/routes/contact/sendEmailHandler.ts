import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"
import { errAsync, okAsync, ResultAsync } from "neverthrow"
import { internalServerErrorFactory } from "@meow-meow-dev/server-utilities/neverthrow"
import { Resend } from "resend"

export const sendEmailJsonSchema = v.strictObject({
  from: v.strictObject({
    email: v.pipe(v.string(), v.email()),
    name: nonEmptyStringSchema,
  }),
  message: nonEmptyStringSchema,
})

type SendEmailProps = v.InferOutput<typeof sendEmailJsonSchema> & {
  contactEmail: string
  resendApiKey: string
}

export const sendEmailHandler = ({
  contactEmail,
  from: { email, name },
  message,
  resendApiKey,
}: SendEmailProps): ResultAsync<undefined, "internal_server_error"> => {
  const resend = new Resend(resendApiKey)

  return ResultAsync.fromPromise(
    resend.emails.send({
      from: contactEmail,
      to: contactEmail,
      subject: `[Ucolorr] Nouveau message de ${name} (${email})`,
      text: message,
    }),
    internalServerErrorFactory
  ).andThen(({ error }) => {
    if (error) {
      console.error(error)
      return errAsync("internal_server_error" as const)
    } else {
      return okAsync(undefined)
    }
  })
}
