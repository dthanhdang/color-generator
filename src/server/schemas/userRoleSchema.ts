import * as v from "valibot";

export const administratorRoleSchema = v.literal("administrator");
export const registeredUserRoleSchema = v.literal("registered_user");

export const userRoleSchema = v.union([
  administratorRoleSchema,
  registeredUserRoleSchema,
]);
