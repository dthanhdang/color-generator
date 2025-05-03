import { CheckCircle, XCircle } from "lucide-react"
import type { JSX } from "react"
import { twMerge } from "tailwind-merge"

export type SubmitStatus =
  | { errorMessage: string; status: "error" }
  | { status: "pending" }
  | { status: "success" }

type SubmitStatusProps = { className?: string; status: SubmitStatus }

export function SubmitStatus({
  className,
  status,
}: SubmitStatusProps): JSX.Element | undefined {
  if (status.status === "pending") return undefined

  const isSuccess = status.status === "success"
  const Icon = isSuccess ? CheckCircle : XCircle

  return (
    <div className={twMerge("flex flex-row gap-5 items-center", className)}>
      <Icon className={isSuccess ? "text-emerald-700" : "text-red-700"} />
      <p className="text-lg">
        {isSuccess
          ? "Thanks for contacting us ! We'll get back to you shortly."
          : status.errorMessage}
      </p>
    </div>
  )
}
