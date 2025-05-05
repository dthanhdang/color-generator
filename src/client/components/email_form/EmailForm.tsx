import { Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { standardResolver } from "mantine-form-standard-resolver"
import * as v from "valibot"

const formDataSchema = v.strictObject({
  email: v.pipe(
    v.string(),
    v.email("Cette adresse e-mail ne semble pas valide"),
    v.minLength(1, "Ce champ est obligatoire")
  ),
})
export type EmailFormData = v.InferOutput<typeof formDataSchema>

type EmailFormProps = {
  defaultEmail?: string
  isSubmitting: boolean
  onSubmit: (data: EmailFormData) => Promise<unknown> | undefined
}

export function EmailForm({
  defaultEmail,
  isSubmitting,
  onSubmit,
}: EmailFormProps): React.JSX.Element {
  const form = useForm({
    initialValues: {
      email: defaultEmail ?? "",
    },
    mode: "uncontrolled",

    validate: standardResolver(formDataSchema),
  })

  const handleSubmit = form.onSubmit(onSubmit)

  return (
    <form data-testid="email-form" onSubmit={handleSubmit}>
      <TextInput
        autoComplete="email"
        autoFocus
        data-testid="email-input"
        key={form.key("email")}
        label="E-mail :"
        name="email"
        placeholder={"e.g. jane.doe@gmail.com"}
        withAsterisk
        {...form.getInputProps("email")}
      />

      <Group className="justify-end" mt="md">
        <Button
          data-testid="submit-button"
          loading={isSubmitting}
          type="submit"
        >
          Request a verification code
        </Button>
      </Group>
    </form>
  )
}
