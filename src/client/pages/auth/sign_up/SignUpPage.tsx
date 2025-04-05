import type { OTPVerificationFormData } from "#client/components/otp_verification_form";
import type { SignUpFormData } from "#client/components/sign_up_form";

import { idTokenToLocalStorageUser } from "#client/auth";
import {
  InvalidOrExpiredCode,
  OtpVerificationErrorMessage,
  OTPVerificationForm,
} from "#client/components/otp_verification_form";
import { SignUpForm } from "#client/components/sign_up_form";
import { TextLink } from "#client/components/text_link";
import { useLocalStorage } from "#client/hooks";
import { useRequestOTP } from "#client/hooks";
import { requestOTP } from "#client/rpc/auth";
import { Card, Stack, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

import { useSignUpMutation } from "./useSignUpMutation.js";
import { Page } from "#client/components/page";
import type { JSX } from "react";

type SignUpPageProps = {
  email?: string;
  role: "administrator" | "registered_user";
};

export function SignUpPage({
  email: defaultEmail,
  role,
}: SignUpPageProps): JSX.Element {
  const { formData, handleResendOTP, handleSubmit } =
    useRequestOTP<SignUpFormData>({
      requestOTP,
    });
  const navigate = useNavigate();
  const signUp = useSignUpMutation();
  const { storeUser } = useLocalStorage();

  const validateCode = formData
    ? async ({
        code,
      }: OTPVerificationFormData): Promise<JSX.Element | undefined> => {
        const signUpExtraProps =
          role === "administrator" ? ({ role: "administrator" } as const) : {};

        const output = await signUp({ ...formData, ...signUpExtraProps, code });

        if ("idToken" in output) {
          const { idToken } = output;

          const user = idTokenToLocalStorageUser(idToken);
          if (user) {
            await storeUser(user);
            await navigate({
              to: role === "administrator" ? "/" /* TODO /admin */ : "/",
            });
          }
        } else {
          switch (output.error) {
            case "administrator_already_exists":
              return (
                <OtpVerificationErrorMessage>
                  There's already an administrator
                </OtpVerificationErrorMessage>
              );
            case "invalid_or_expired_code":
              return <InvalidOrExpiredCode />;
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
                    sign-in ?
                  </TextLink>
                </p>
              );
          }
        }
      }
    : undefined;

  return (
    <Page displayTitle={false}>
      <Card
        className="mx-2 my-auto lg:mx-auto lg:w-2/5"
        component="main"
        padding="lg"
        radius="md"
        shadow="sm"
        withBorder
      >
        <Stack gap={20}>
          <Title className="text-center" order={1}>
            {role === "administrator" ? "Sign-up as administrator" : "Sign-up"}
          </Title>
          {validateCode && formData ? (
            <OTPVerificationForm
              email={formData.email}
              onResendCode={handleResendOTP}
              validateCode={validateCode}
            />
          ) : (
            <SignUpForm defaultEmail={defaultEmail} onSubmit={handleSubmit} />
          )}
        </Stack>
      </Card>
    </Page>
  );
}
