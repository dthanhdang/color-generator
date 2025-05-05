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

import { useSignInMutation } from "#client/hooks"
import { Stack, Text } from "@mantine/core"

type SignInPageProps = {
  email?: string
  redirectTo?: string
  role: "administrator" | "registered_user"
}

export function SignInPage({
  email: defaultEmail,
  redirectTo,
  role,
}: SignInPageProps): React.JSX.Element {
  const navigate = useNavigate()
  const signIn = useSignInMutation()
  const { formData, handleResendOTP, handleSubmit, isSubmitting } =
    useRequestOTP<EmailFormData>({ requestOTP })
  const { storeUser } = useLocalStorage()

  const onSubmitOTP = formData
    ? async ({
        code,
      }: OTPVerificationFormData): Promise<React.JSX.Element | undefined> => {
        const signInExtraProps = role === "administrator" ? { role } : {}
        const output = await signIn({ ...formData, ...signInExtraProps, code })

        if ("idToken" in output) {
          const { idToken } = output

          const user = idTokenToLocalStorageUser(idToken)
          if (user) {
            await storeUser(user)
            await navigate({
              to:
                redirectTo ??
                (role === "administrator" ? "/admin" : "/palettes-explorer"),
            })
          } else {
            // TODO
          }
        } else {
          switch (output.error) {
            case "invalid_or_expired_code":
              return <InvalidOrExpiredCode />
            case "user_does_not_exist":
              return (
                <p>
                  You don't have an account yet, would you rather{" "}
                  <TextLink
                    search={{
                      email: formData.email,
                      role: role === "administrator" ? role : undefined,
                    }}
                    to="/auth/sign-up"
                  >
                    sign-up
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
        role === "administrator" ? "Sign-in as Administrator" : "Sign-in"
      }
    >
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
          <Text>
            Not a member yet ? <TextLink to="/auth/sign-up">Sign-up</TextLink>{" "}
            instead
          </Text>
        </Stack>
      )}
    </AuthPage>
  )
}
