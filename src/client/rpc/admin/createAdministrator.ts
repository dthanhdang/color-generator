import { apiClient } from "./apiClient.js"
import { UserSummary } from "#client/types"
import type { RegistrationFormData } from "#components/registration_form/index.js"
import { handleError } from "#client/rpc/custom_fetch"
import { fromUserSummaryDto } from "../conversion/fromUserSummaryDto.js"

const route = apiClient.user.administrator.$post

export type CreateAdministratorProps = RegistrationFormData

export type CreateAdministratorOutput =
  | { user: UserSummary }
  | { error: "user_already_exists" }

export async function createAdministrator(
  formData: CreateAdministratorProps
): Promise<CreateAdministratorOutput> {
  try {
    const response = await route({ json: formData })

    const content = await response.json()
    return "error" in content
      ? content
      : { user: fromUserSummaryDto(content.user) }
  } catch (error) {
    handleError(
      error,
      "An unexpected error occured while creating the administrator"
    )
  }
}
