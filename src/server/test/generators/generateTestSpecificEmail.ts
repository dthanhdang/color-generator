import type { ExpectStatic } from "vitest";

import slugify from "@sindresorhus/slugify";

export function generateTestSpecificEmail(expect: ExpectStatic): string {
  const { currentTestName } = expect.getState();
  expect(currentTestName).toBeDefined();
  if (!currentTestName)
    throw new Error("Unable to generate test-specific email");

  const slug = slugify(currentTestName);
  return `${slug}@gmail.com`;
}
