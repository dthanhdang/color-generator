import type { Context } from "hono"

import { err, ok, Result } from "neverthrow"

import type { EnvironmentVariableKey } from "./buildHono.js"

export function getEnvironmentVariable<
  Env extends {
    Bindings: Record<EnvironmentVariableKey, string | undefined>
  },
>(
  c: Context<Env>,
  key: EnvironmentVariableKey
): Result<string, "internal_server_error"> {
  const value = c.env[key]
  return value === undefined ? err("internal_server_error") : ok(value)
}

export function getEnvironmentVariables<
  Env extends {
    Bindings: Record<EnvironmentVariableKey, string | undefined>
  },
>(
  c: Context<Env>,
  [key1, key2]: [EnvironmentVariableKey, EnvironmentVariableKey]
): Result<[string, string], "internal_server_error"> {
  return Result.combine([
    getEnvironmentVariable(c, key1),
    getEnvironmentVariable(c, key2),
  ])
}
