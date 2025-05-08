import { generateTestSpecificEmail } from "#server/test/generators"
import {
  unsafeUnwrap,
  unsafeUnwrapErr,
} from "@meow-meow-dev/server-utilities/neverthrow"
import { env } from "cloudflare:test"
import { describe, it } from "vitest"

import { createUser } from "./createUser.js"
import { getUserByEmailAndRole } from "./getUserByEmailAndRole.js"
import { getUserById } from "./getUserById.js"
import { toIsoDate } from "#server/utils/date"

const identity = {
  firstName: "John",
  lastName: "Doe",
}

const date = toIsoDate(new Date())
const timestamps = { lastSignInDate: date, signUpDate: date }

describe("create user", () => {
  it("handles duplicate emails", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)

    await unsafeUnwrap(
      createUser({
        db: env.DB,
        user: { ...identity, ...timestamps, email, role: "registered_user" },
      })
    )

    expect(
      await unsafeUnwrapErr(
        createUser({
          db: env.DB,
          user: { ...identity, ...timestamps, email, role: "registered_user" },
        })
      )
    ).toEqual("user_already_exists")

    await unsafeUnwrap(
      createUser({
        db: env.DB,
        user: { ...identity, ...timestamps, email, role: "administrator" },
      })
    )
  })

  it("finds user by email / role", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    await unsafeUnwrap(
      createUser({
        db: env.DB,
        user: { ...identity, ...timestamps, email, role: "registered_user" },
      })
    )

    const databaseUser = await unsafeUnwrap(
      getUserByEmailAndRole({
        db: env.DB,
        email,
        role: "registered_user",
      })
    )

    expect(databaseUser).toMatchObject({
      ...identity,
      email,
      role: "registered_user",
    })

    expect(
      await unsafeUnwrapErr(
        getUserByEmailAndRole({
          db: env.DB,
          email,
          role: "administrator",
        })
      )
    ).toEqual("not_found")
  })

  it("doesn't find users by non-existent email", async ({ expect }) => {
    expect(
      await unsafeUnwrapErr(
        getUserByEmailAndRole({
          db: env.DB,
          email: "a@b.com",
          role: "registered_user",
        })
      )
    ).toEqual("not_found")
  })

  it("doesn't find users by non-existent id", async ({ expect }) => {
    expect(
      await unsafeUnwrapErr(getUserById({ db: env.DB, id: 10_000_000 }))
    ).toEqual("not_found")
  })
})
