import * as v from "valibot"

const requiredFieldErrorMessage = "This field is required"
const requiredFieldSchema = v.pipe(
  v.string(),
  v.nonEmpty(requiredFieldErrorMessage)
)

export const schema = v.strictObject({
  email: v.pipe(
    v.string(),
    v.nonEmpty(requiredFieldErrorMessage),
    v.email("This email is invalid")
  ),
  name: requiredFieldSchema,
  message: requiredFieldSchema,
  website: v.string(), // Honeypot, not meant to be filled
})

export type ContactFormData = v.InferOutput<typeof schema>
