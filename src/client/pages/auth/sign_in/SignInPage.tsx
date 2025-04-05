import type { EmailFormData } from "#client/components/email_form";
import type { OTPVerificationFormData } from "#client/components/otp_verification_form";

import { idTokenToLocalStorageUser } from "#client/auth";
import { EmailForm } from "#client/components/email_form";
import {
  InvalidOrExpiredCode,
  OTPVerificationForm,
} from "#client/components/otp_verification_form";
import { Page } from "#client/components/page";
import { TextLink } from "#client/components/text_link";
import { useLocalStorage } from "#client/hooks";
import { useRequestOTP } from "#client/hooks";
import { requestOTP } from "#client/rpc/auth";
import { Card, Stack, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

import { useSignInMutation } from "./useSignInMutation.js";

type SignInPageProps = {
  email?: string;
  redirectTo?: string;
  role: "administrator" | "registered_user";
};

export function SignInPage({
  email: defaultEmail,
  redirectTo,
  role,
}: SignInPageProps): React.JSX.Element {
  const navigate = useNavigate();
  const signIn = useSignInMutation();
  const { formData, handleResendOTP, handleSubmit } =
    useRequestOTP<EmailFormData>({ requestOTP });
  const { storeUser } = useLocalStorage();

  const onSubmitOTP = formData
    ? async ({
        code,
      }: OTPVerificationFormData): Promise<React.JSX.Element | undefined> => {
        const signInExtraProps = role === "administrator" ? { role } : {};
        const output = await signIn({ ...formData, ...signInExtraProps, code });

        if ("idToken" in output) {
          const { idToken } = output;

          const user = idTokenToLocalStorageUser(idToken);
          if (user) {
            await storeUser(user);
            await navigate({
              to: redirectTo ?? "/", // role === "administrator" ? "/admin" : "/dashboard",
            });
          } else {
            // TODO
          }
        } else {
          switch (output.error) {
            case "invalid_or_expired_code":
              return <InvalidOrExpiredCode />;
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
                    sign-up ?
                  </TextLink>
                  {" ?"}
                </p>
              );
          }
        }
      }
    : undefined;

  return (
    <Page displayTitle={false}>
      <Card
        className="m-auto lg:w-2/5"
        padding="lg"
        radius="md"
        shadow="sm"
        withBorder
      >
        <Stack gap={20}>
          <Title className="text-center" order={1}>
            {role === "administrator" ? "Sign-in as Administrator" : "Sign-in"}
          </Title>

          {formData && onSubmitOTP ? (
            <OTPVerificationForm
              email={formData.email}
              onResendCode={handleResendOTP}
              validateCode={onSubmitOTP}
            />
          ) : (
            <EmailForm defaultEmail={defaultEmail} onSubmit={handleSubmit} />
          )}
        </Stack>
      </Card>
    </Page>
  );
}
