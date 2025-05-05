import type { OTPVerificationFormData } from "#client/components/otp_verification_form"
import type { SignUpFormData } from "#client/components/sign_up_form"

import { idTokenToLocalStorageUser } from "#client/auth"
import {
  InvalidOrExpiredCode,
  OtpVerificationErrorMessage,
  OTPVerificationForm,
} from "#client/components/otp_verification_form"
import { SignUpForm } from "#client/components/sign_up_form"
import { TextLink } from "#client/components/text_link"
import { useLocalStorage } from "#client/hooks"
import { useRequestOTP } from "#client/hooks"
import { requestOTP } from "#client/rpc/auth"
import { useNavigate } from "@tanstack/react-router"

import { useSignUpMutation } from "./useSignUpMutation.js"
import { AuthPage } from "#client/components/page"
import type { JSX } from "react"
import { Stack, Text } from "@mantine/core"

type SignUpPageProps = {
  email?: string
  role: "administrator" | "registered_user"
}

export function SignUpPage({
  email: defaultEmail,
  role,
}: SignUpPageProps): JSX.Element {
  const { formData, handleResendOTP, handleSubmit } =
    useRequestOTP<SignUpFormData>({
      requestOTP,
    })
  const navigate = useNavigate()
  const signUp = useSignUpMutation()
  const { storeUser } = useLocalStorage()

  const validateCode = formData
    ? async ({
        code,
      }: OTPVerificationFormData): Promise<JSX.Element | undefined> => {
        const signUpExtraProps =
          role === "administrator" ? ({ role: "administrator" } as const) : {}

        const output = await signUp({ ...formData, ...signUpExtraProps, code })

        if ("idToken" in output) {
          const { idToken } = output

          const user = idTokenToLocalStorageUser(idToken)
          if (user) {
            await storeUser(user)
            await navigate({
              to: role === "administrator" ? "/admin/users" : "/",
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
                      role: role === "administrator" ? role : undefined,
                    }}
                    to="/auth/sign-in"
                  >
                    sign-in
                  </TextLink>
                  {" ?"}
                </p>
              )
          }
        }
      }
    : undefined

  return (
    <AuthPage
      pageTitle={
        role === "administrator" ? "Sign-up as administrator" : "Sign-up"
      }
    >
      {validateCode && formData ? (
        <OTPVerificationForm
          email={formData.email}
          onResendCode={handleResendOTP}
          validateCode={validateCode}
        />
      ) : (
        <Stack>
          <SignUpForm
            buttonLabel="Request a verification code"
            defaultEmail={defaultEmail}
            onSubmit={handleSubmit}
          />

          <Text>
            Already a member ? <TextLink to="/auth/sign-in">Sign-in</TextLink>{" "}
            instead
          </Text>
        </Stack>
      )}
    </AuthPage>
  )
}
