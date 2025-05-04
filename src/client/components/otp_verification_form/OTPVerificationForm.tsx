import { showSuccessNotification } from "#client/components/notifications"
import { Button, Flex, PinInput, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { standardResolver } from "mantine-form-standard-resolver"
import { useRef, useState } from "react"
import * as v from "valibot"

import { EmailProviderLink } from "./EmailProviderLink.jsx"

export type OTPVerificationFormData = v.InferOutput<
  ReturnType<typeof useFormSchema>
>

type OTPVerificationFormProps = {
  email: string
  onResendCode: () => Promise<void> | undefined
  validateCode: (
    data: OTPVerificationFormData
  ) => Promise<React.JSX.Element | undefined>
}

export function OTPVerificationForm({
  email,
  onResendCode,
  validateCode,
}: OTPVerificationFormProps): React.JSX.Element {
  const schema = useFormSchema()
  const [error, setError] = useState<React.JSX.Element>()
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm({
    initialValues: {
      code: "",
    },
    mode: "uncontrolled",
    validate: standardResolver(schema),
  })
  form.watch("code", ({ value }) => {
    if (value.length === 6 && formRef.current) formRef.current.requestSubmit()
  })

  async function onSubmit(data: OTPVerificationFormData): Promise<void> {
    setError(await validateCode(data))
  }

  async function handleResend(): Promise<void> {
    await onResendCode()
    setError(undefined)
    form.reset()
    showSuccessNotification("Code successfully resent")
  }

  const handleSubmit = form.onSubmit(onSubmit)

  return (
    <form
      data-testid="otp-verification-form"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Stack className="gap-5">
        <p>
          Please input the verification code which was sent to your e-mail
          address <span className="font-bold">{email}</span>
        </p>

        <EmailProviderLink className="mx-auto" email={email} />

        <PinInput
          {...form.getInputProps("code")}
          autoFocus
          className="mx-auto w-max"
          classNames={{ root: "max-md:gap-1" }}
          data-testid="otp-input-wrapper"
          length={6}
          placeholder="0"
          type="number"
        />

        {error}

        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          gap={{ base: "sm", lg: "lg" }}
          justify={{ sm: "center" }}
        >
          <Button
            data-testid="resend-code-button"
            onClick={handleResend}
            type="button"
            variant="transparent"
          >
            Resend code
          </Button>

          <Button
            data-testid="submit-button"
            loading={form.submitting}
            type="submit"
          >
            Verify code
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

function useFormSchema(): v.StrictObjectSchema<
  {
    readonly code: v.SchemaWithPipe<
      readonly [v.StringSchema<undefined>, v.RegexAction<string, string>]
    >
  },
  undefined
> {
  return v.strictObject({
    code: v.pipe(v.string(), v.regex(/^\d{6}$/, "OTP must contain 6 digits")),
  })
}
