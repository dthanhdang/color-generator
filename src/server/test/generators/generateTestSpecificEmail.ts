import type { ExpectStatic } from "vitest"

import slugify from "@sindresorhus/slugify"

export function generateTestSpecificEmail(
  expect: ExpectStatic,
  suffix: string = ""
): string {
  const { currentTestName } = expect.getState()
  expect(currentTestName).toBeDefined()
  if (!currentTestName)
    throw new Error("Unable to generate test-specific email")

  const slug = slugify(currentTestName)
  return `${slug}${suffix}@gmail.com`
}
