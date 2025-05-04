import { UserRole } from "#server/types"

export const allScopes = [
  "current_user:read",
  "current_user:write",
  "registered_users:read",
] as const

export type Scope = (typeof allScopes)[number]

export const scopesByRole: Record<UserRole, readonly Scope[]> = {
  administrator: [
    "current_user:read",
    "current_user:write",
    "registered_users:read",
  ],
  registered_user: ["current_user:read", "current_user:write"],
}
