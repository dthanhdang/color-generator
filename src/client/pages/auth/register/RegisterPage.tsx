import type { OTPVerificationFormData } from "#client/components/otp_verification_form"
import type { RegistrationFormData } from "#client/components/registration_form"

import { idTokenToLocalStorageUser } from "#client/auth"
import {
  InvalidOrExpiredCode,
  OtpVerificationErrorMessage,
  OTPVerificationForm,
} from "#client/components/otp_verification_form"
import { RegistrationForm } from "#client/components/registration_form"
import { TextLink } from "#client/components/text_link"
import { useLocalStorage } from "#client/hooks"
import { useRequestOTP } from "#client/hooks"
import { requestOTP } from "#client/rpc/auth"
import { useNavigate } from "@tanstack/react-router"

import { useRegisterMutation } from "./useRegisterMutation.js"
import { AuthPage } from "#client/components/page"
import type { JSX } from "react"
import { Stack, Text } from "@mantine/core"

type RegisterPageProps = {
  email?: string
  redirectTo?: string
}

export function RegisterPage({
  email: defaultEmail,
  redirectTo,
}: RegisterPageProps): JSX.Element {
  const { formData, handleResendOTP, handleSubmit } =
    useRequestOTP<RegistrationFormData>({
      requestOTP,
    })
  const navigate = useNavigate()
  const register = useRegisterMutation()
  const { storeUser } = useLocalStorage()

  const validateCode = formData
    ? async ({
        code,
      }: OTPVerificationFormData): Promise<JSX.Element | undefined> => {
        const output = await register({
          ...formData,
          code,
        })

        if ("idToken" in output) {
          const { idToken } = output

          const user = idTokenToLocalStorageUser(idToken)
          if (user) {
            await storeUser(user)
            await navigate({
              to: redirectTo ?? "/",
            })
          }
        } else {
          switch (output.error) {
            case "administrator_already_exists":
              return (
                <OtpVerificationErrorMessage>
                  There's already an administrator
                </OtpVerificationErrorMessage>
              )
            case "invalid_or_expired_code":
              return <InvalidOrExpiredCode />
            case "user_already_exists":
              return (
                <p>
                  You already have an account. Would you rather{" "}
                  <TextLink
                    search={{
                      email: formData.email,
                      redirect_to: redirectTo,
                    }}
                    to="/auth/log-in"
                  >
                    log in
                  </TextLink>
                  {" ?"}
                </p>
              )
          }
        }
      }
    : undefined

  return (
    <AuthPage>
      {validateCode && formData ? (
        <OTPVerificationForm
          email={formData.email}
          onResendCode={handleResendOTP}
          validateCode={validateCode}
        />
      ) : (
        <Stack>
          <RegistrationForm
            buttonLabel="Request a verification code"
            defaultEmail={defaultEmail}
            onSubmit={handleSubmit}
          />

          <Text>
            Already a member ?{" "}
            <TextLink
              to="/auth/log-in"
              search={{
                redirect_to: redirectTo,
              }}
            >
              Log in
            </TextLink>{" "}
            instead
          </Text>
        </Stack>
      )}
    </AuthPage>
  )
}
