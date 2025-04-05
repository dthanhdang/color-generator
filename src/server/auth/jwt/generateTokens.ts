import type { IdToken, User } from "#server/types"
import type { GenerateTokensReturn } from "@meow-meow-dev/server-utilities/auth"
import type {
  AccessTokenPayload,
  WithoutJWTTimeStamps,
} from "@meow-meow-dev/server-utilities/jwt"
import type { Simplify } from "type-fest"

import {
  buildSubjectFromUserId,
  generateTokens as generateTokensBase,
} from "@meow-meow-dev/server-utilities/auth"
import { internalServerErrorFactory } from "@meow-meow-dev/server-utilities/neverthrow"
import { ResultAsync } from "neverthrow"

import { apiAudience, issuer, subjectPrefix } from "./AccessToken.js"
import { scopesByRole } from "./Scope.js"

const aud = [apiAudience]

type GenerateTokensProps = {
  secret: string
  user: User
}

export function generateTokens({
  secret,
  user,
}: GenerateTokensProps): ResultAsync<
  GenerateTokensReturn,
  "internal_server_error"
> {
  const { id, role } = user
  const sub = buildSubjectFromUserId(subjectPrefix, id)

  // TODO add an utility to server-utilities
  const scope = scopesByRole[role].join(" ")
  const accessTokenPayload: WithoutJWTTimeStamps<AccessTokenPayload> = {
    aud,
    iss: issuer,
    scope,
    sub,
  }

  return ResultAsync.fromPromise(
    generateTokensBase({
      accessTokenPayload,
      idTokenPayload: userToIdTokenPayload(user, sub),
      secret,
    }),
    internalServerErrorFactory
  )
}

function userToIdTokenPayload(
  user: User,
  sub: string
): Simplify<WithoutJWTTimeStamps<IdToken>> {
  const {
    email,
    identity: { firstName, lastName },
    role,
  } = user

  if (role === "registered_user") {
    return {
      email,
      family_name: lastName,
      given_name: firstName,
      status: {
        role,
      },
      sub,
    }
  } else {
    return {
      email,
      family_name: lastName,
      given_name: firstName,
      status: { role },
      sub,
    }
  }
}
