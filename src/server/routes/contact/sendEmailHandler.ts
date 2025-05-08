import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"
import type { ResultAsync } from "neverthrow"
import { sendEmail } from "#server/utils/email"
import type { HandlerResendApiKeyProps } from "#server/types"

export const sendEmailJsonSchema = v.strictObject({
  from: v.strictObject({
    email: v.pipe(v.string(), v.email()),
    name: nonEmptyStringSchema,
  }),
  message: nonEmptyStringSchema,
})

type SendEmailProps = v.InferOutput<typeof sendEmailJsonSchema> &
  HandlerResendApiKeyProps & {
    contactEmail: string
  }

export const sendEmailHandler = ({
  contactEmail,
  from: { email, name },
  message,
  resendApiKey,
}: SendEmailProps): ResultAsync<undefined, "internal_server_error"> =>
  sendEmail({
    body: message,
    sender: contactEmail,
    recipient: contactEmail,
    resendApiKey,
    subject: `[Ucolorr] Nouveau message de ${name} (${email})`,
  })
