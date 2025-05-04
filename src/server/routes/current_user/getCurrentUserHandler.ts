import type { AccessToken } from "#server/auth/jwt"
import { getFullRegisteredUserById } from "#server/glue/registered_user"
import type { RegisteredUser } from "#server/types"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import { errAsync, okAsync, type ResultAsync } from "neverthrow"

type GetCurrentUserHandlerProps = HandlerAuthenticationProps<AccessToken> &
  HandlerDBProps

export function getCurrentUserHandler({
  accessToken: { userId },
  db,
}: GetCurrentUserHandlerProps): ResultAsync<
  RegisteredUser | undefined,
  "internal_server_error" | "not_found"
> {
  return getFullRegisteredUserById({ db, userId }).orElse((error) =>
    error === "not_found" ? okAsync(undefined) : errAsync(error)
  )
}
