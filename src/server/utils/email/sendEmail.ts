import { errAsync, okAsync, ResultAsync } from "neverthrow"
import { internalServerErrorFactory } from "@meow-meow-dev/server-utilities/neverthrow"
import { Resend } from "resend"

export type SendEmailProps = {
  body: string
  recipient: string
  resendApiKey: string
  sender: string
  subject: string
}

export const sendEmail = ({
  body,
  recipient,
  resendApiKey,
  sender,
  subject,
}: SendEmailProps): ResultAsync<undefined, "internal_server_error"> => {
  const resend = new Resend(resendApiKey)

  return ResultAsync.fromPromise(
    resend.emails.send({
      from: sender,
      to: recipient,
      subject,
      html: body,
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
