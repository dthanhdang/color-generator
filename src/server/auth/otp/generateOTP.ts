import { randomBytes } from "node:crypto"

type GenerateOTPProps = {
  length: number
}

export function generateOTP({ length }: GenerateOTPProps): string {
  return Number.parseInt(randomBytes(length).toString("hex"), 16)
    .toString()
    .slice(0, length)
}
