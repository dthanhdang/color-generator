import { UserRole } from "#server/types"

export const allScopes = [
  "current_user:read",
  "current_user:write",
  "public_palette:read",
  "public_palette:write",
  "users:read",
  "users:write",
] as const

export type Scope = (typeof allScopes)[number]

export const scopesByRole: Record<UserRole, readonly Scope[]> = {
  administrator: [
    "current_user:read",
    "current_user:write",
    "users:read",
    "users:write",
    "public_palette:read",
    "public_palette:write",
  ],
  registered_user: ["current_user:read", "current_user:write"],
}
