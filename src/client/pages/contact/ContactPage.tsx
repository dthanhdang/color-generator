import type { JSX } from "react"
import { sendEmail } from "#client/rpc/contact"
import { ContactForm } from "./ContactForm.tsx"
import type { ContactFormData } from "./ContactFormData.tsx"
import { PageStyle } from "#components/PageStyle.tsx"

export function ContactPage(): JSX.Element {
  const handleSubmit = ({
    email,
    message,
    name,
  }: ContactFormData): Promise<undefined> =>
    sendEmail({ from: { email, name }, message })

  return (
    <PageStyle title="Contact">
      <ContactForm onSubmit={handleSubmit} />
    </PageStyle>
  )
}
