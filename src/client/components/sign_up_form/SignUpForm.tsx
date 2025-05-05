import type {
  RequiredEmailSchema,
  RequiredStringSchema,
} from "#client/hooks/validation"

import {
  useRequiredEmailSchema,
  useRequiredStringSchema,
} from "#client/hooks/validation"
import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { standardResolver } from "mantine-form-standard-resolver"
import * as v from "valibot"
export type SignUpFormData = v.InferOutput<ReturnType<typeof useFormDataSchema>>

type SignUpFormProps = {
  buttonLabel: string
  defaultEmail?: string
  onSubmit: (data: SignUpFormData) => Promise<unknown> | undefined
}

export function SignUpForm({
  buttonLabel,
  defaultEmail,
  onSubmit,
}: SignUpFormProps): React.JSX.Element {
  const form = useForm({
    initialValues: {
      email: defaultEmail ?? "",
      firstName: "",
      lastName: "",
    },
    mode: "uncontrolled",

    validate: standardResolver(useFormDataSchema()),
  })

  const handleSubmit = form.onSubmit(onSubmit)

  return (
    <form onSubmit={handleSubmit}>
      <Stack className="gap-5">
        <TextInput
          {...form.getInputProps("firstName")}
          autoCorrect="given-name"
          autoFocus
          data-autofocus
          label="First name :"
          name="firstName"
          placeholder={"e.g. Jane"}
          withAsterisk
        />

        <TextInput
          {...form.getInputProps("lastName")}
          autoComplete="family-name"
          label="Last name :"
          name="lastName"
          placeholder={"e.g. Doe"}
          withAsterisk
        />

        <TextInput
          {...form.getInputProps("email")}
          autoComplete="email"
          label="E-mail address :"
          name="email"
          placeholder="e.g. jane.doe@gmail.com"
          withAsterisk
        />

        <Group justify="flex-end" mt="md">
          <Button loading={form.submitting} type="submit">
            {buttonLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

function useFormDataSchema(): v.StrictObjectSchema<
  {
    readonly email: RequiredEmailSchema
    readonly firstName: RequiredStringSchema
    readonly lastName: RequiredStringSchema
  },
  undefined
> {
  const email = useRequiredEmailSchema()
  const requiredString = useRequiredStringSchema()

  return v.strictObject({
    email,
    firstName: requiredString,
    lastName: requiredString,
  })
}
