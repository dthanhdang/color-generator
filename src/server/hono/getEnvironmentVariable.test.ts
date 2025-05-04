import { customResponse } from "@meow-meow-dev/server-utilities/hono"
import { Hono } from "hono"
import { okAsync } from "neverthrow"
import { describe, it } from "vitest"

import type { HonoEnv } from "./buildHono.js"

import { getEnvironmentVariable } from "./getEnvironmentVariable.js"

describe("customResponse", () => {
  it("returns an error for undefined variables", async ({ expect }) => {
    const app = new Hono<HonoEnv>().get("/", (c) =>
      customResponse(
        c,
        getEnvironmentVariable(c, "CF_PAGES_URL").asyncAndThen((value) =>
          okAsync(value)
        ),
        (value) => c.json({ value })
      )
    )

    // TODO replace by toBeInternalServerError
    await expect(app.request("/", undefined, {})).not.toBeHTTPOk()
  })

  it("returns ok for defined variables", async ({ expect }) => {
    const app = new Hono<HonoEnv>().get("/", (c) =>
      customResponse(
        c,
        getEnvironmentVariable(c, "CF_PAGES_URL").asyncAndThen((value) =>
          okAsync(value)
        ),
        (value) => c.json({ value })
      )
    )

    await expect(
      app.request("/", undefined, { CF_PAGES_URL: "https://localhost:5173" })
    ).toBeHTTPOk({ value: "https://localhost:5173" })
  })
})
