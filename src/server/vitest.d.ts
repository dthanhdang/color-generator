import "vitest"

import type { HTTPMatcher } from "@meow-meow-dev/server-utils/test/matchers"

interface CustomMatchers<R = unknown> {
  toBeHTTPBadRequest: HTTPMatcher<R>
  toBeHTTPConflict: HTTPMatcher<R>
  toBeHTTPForbidden: HTTPMatcher<R>
  toBeHTTPNotFound: HTTPMatcher<R>
  toBeHTTPOk: HTTPMatcher<R>
  toBeHTTPUnauthorized: HTTPMatcher<R>

  toBeNeverthrowErr: HTTPMatcher<R>
  toBeNeverthrowOk: HTTPMatcher<R>
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
}
