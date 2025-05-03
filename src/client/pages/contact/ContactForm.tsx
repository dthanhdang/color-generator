import { useState, type JSX } from "react"
import { Form, useForm } from "@mantine/form"
import { valibotResolver } from "mantine-form-valibot-resolver"
import { Button, Textarea, TextInput } from "@mantine/core"
import { SubmitStatus as SubmitStatusElement } from "./SubmitStatus.tsx"
import type { SubmitStatus } from "./SubmitStatus.tsx"
import type { ContactFormData } from "./ContactFormData.ts"
import { schema } from "./ContactFormData.ts"
import { Mail } from "lucide-react"

type ContactFormProps = {
  onSubmit: (formData: ContactFormData) => undefined | Promise<undefined>
}

export function ContactForm({ onSubmit }: ContactFormProps): JSX.Element {
  const form = useForm({
    initialValues: { email: "", message: "", name: "", website: "" },
    validate: valibotResolver(schema),
  })
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    status: "pending",
  })

  const handleSubmit = async (formData: ContactFormData): Promise<void> => {
    try {
      if (formData.website === "") await onSubmit(formData)

      setSubmitStatus({ status: "success" })
      form.reset()
    } catch (e) {
      setSubmitStatus({
        errorMessage:
          e instanceof Error
            ? e.message
            : "An unexpected error occured while sending the email",
        status: "error",
      })
    }
  }

  return (
    <>
      <SubmitStatusElement className="mb-5" status={submitStatus} />

      <Form form={form} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <TextInput
            {...form.getInputProps("name")}
            autoFocus
            description="e.g. Jane Doe"
            label="Your name :"
            withAsterisk
          />

          <TextInput
            {...form.getInputProps("email")}
            description="e.g. jane.doe@gmail.com"
            label="Your email address :"
            type="email"
            withAsterisk
          />

          <Textarea
            {...form.getInputProps("message")}
            label="Message :"
            minRows={10}
            withAsterisk
          />

          <TextInput
            {...form.getInputProps("website")}
            aria-hidden
            className="hidden"
            description="e.g. www.ucolor.app"
            label="Website :"
          />
        </div>

        <Button.Group className="justify-end">
          <Button
            leftSection={<Mail size={16} />}
            loading={form.submitting}
            type="submit"
          >
            Send message
          </Button>
        </Button.Group>
      </Form>
    </>
  )
}
