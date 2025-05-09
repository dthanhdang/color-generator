import type { EmailFormData } from "#client/components/email_form"
import type { OTPVerificationFormData } from "#client/components/otp_verification_form"

import { idTokenToLocalStorageUser } from "#client/auth"
import { EmailForm } from "#client/components/email_form"
import {
  InvalidOrExpiredCode,
  OTPVerificationForm,
} from "#client/components/otp_verification_form"
import { AuthPage } from "#client/components/page"
import { TextLink } from "#client/components/text_link"
import { useLocalStorage } from "#client/hooks"
import { useRequestOTP } from "#client/hooks"
import { requestOTP } from "#client/rpc/auth"
import { useNavigate } from "@tanstack/react-router"

import { useLogInMutation } from "#client/hooks"
import { Stack, Text } from "@mantine/core"

type LogInPageProps = {
  email?: string
  redirectTo?: string
  role: "administrator" | "registered_user"
}

export function LogInPage({
  email: defaultEmail,
  redirectTo,
  role,
}: LogInPageProps): React.JSX.Element {
  const navigate = useNavigate()
  const logIn = useLogInMutation()
  const { formData, handleResendOTP, handleSubmit, isSubmitting } =
    useRequestOTP<EmailFormData>({ requestOTP })
  const { storeUser } = useLocalStorage()

  const onSubmitOTP = formData
    ? async ({
        code,
      }: OTPVerificationFormData): Promise<React.JSX.Element | undefined> => {
        const logInExtraProps = role === "administrator" ? { role } : {}
        const output = await logIn({ ...formData, ...logInExtraProps, code })

        if ("idToken" in output) {
          const { idToken } = output

          const user = idTokenToLocalStorageUser(idToken)
          if (user) {
            await navigate({
              to:
                redirectTo ??
                (role === "administrator" ? "/admin" : "/palettes-explorer"),
            })
            await storeUser(user)
          } else {
            // TODO
          }
        } else {
          switch (output.error) {
            case "invalid_or_expired_code":
              return <InvalidOrExpiredCode />
            case "user_does_not_exist":
              return role === "administrator" ? (
                <p>You're not an administrator</p>
              ) : (
                <p>
                  You don't have an account yet, would you rather{" "}
                  <TextLink
                    search={{
                      email: formData.email,
                    }}
                    to="/auth/register"
                  >
                    register
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
      {formData && onSubmitOTP ? (
        <OTPVerificationForm
          email={formData.email}
          onResendCode={handleResendOTP}
          validateCode={onSubmitOTP}
        />
      ) : (
        <Stack>
          <EmailForm
            defaultEmail={defaultEmail}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
          {role === "administrator" ? undefined : (
            <Text>
              Not a member yet ?{" "}
              <TextLink
                to="/auth/register"
                search={{
                  redirect_to: redirectTo,
                }}
              >
                Register
              </TextLink>{" "}
              instead
            </Text>
          )}
        </Stack>
      )}
    </AuthPage>
  )
}
