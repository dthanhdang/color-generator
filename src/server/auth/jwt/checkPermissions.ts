import type { AccessTokenFactoryFactoryProps } from "@meow-meow-dev/server-utilities/auth"

import {
  checkPermissionsMiddlewareHandlerFactory,
  extractUserIdFromSubject,
} from "@meow-meow-dev/server-utilities/auth"

import type { AccessToken } from "./AccessToken.js"
import type { Scope } from "./Scope.js"

import {
  accessTokenCookieName,
  apiAudience,
  subjectPrefix,
} from "./AccessToken.js"

function accessTokenFactory({
  accessTokenPayload,
}: AccessTokenFactoryFactoryProps<Scope>): Promise<AccessToken | undefined> {
  const { sub } = accessTokenPayload
  const userId = extractUserIdFromSubject(subjectPrefix, sub)

  return Promise.resolve(userId === undefined ? undefined : { userId })
}

export const checkPermissions = checkPermissionsMiddlewareHandlerFactory({
  accessTokenCookieName,
  accessTokenFactory,
  requiredAudience: apiAudience,
})
