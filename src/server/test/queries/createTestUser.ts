import { env } from "cloudflare:test"
import { createUser } from "#server/queries/user"
import type { Selectable } from "kysely"
import type { User } from "#server/types/database"
import { ResultAsync } from "neverthrow"
import { generateTestSpecificEmail } from "../generators/generateTestSpecificEmail.ts"
import type { ExpectStatic } from "vitest"

export function createTestUser(
  expect: ExpectStatic
): ResultAsync<
  Selectable<User>,
  "internal_server_error" | "user_already_exists"
> {
  return createUser({
    db: env.DB,
    user: {
      email: generateTestSpecificEmail(expect),
      firstName: "Test",
      lastName: "Test",
      role: "registered_user",
    },
  })
}
