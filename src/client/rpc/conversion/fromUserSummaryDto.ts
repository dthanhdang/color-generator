import { UserSummary, UserSummaryDto } from "#client/types"

export function fromUserSummaryDto({
  lastSignInDate,
  signUpDate,
  ...user
}: UserSummaryDto): UserSummary {
  return {
    ...user,
    lastSignInDate: new Date(lastSignInDate),
    signUpDate: new Date(signUpDate),
  }
}
