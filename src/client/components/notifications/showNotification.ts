import { notifications } from "@mantine/notifications"
import * as v from "valibot"

const propsSchema = v.object({
  autoCloseDelay: v.optional(v.number()),
  message: v.string(),
  title: v.optional(v.string()),
})

type MessageOrProps = string | v.InferOutput<typeof propsSchema>

type ShowNotificationProps = {
  autoCloseDelay: number
  kind: "error" | "success"
  message: string
  title: string
}

export function showErrorNotification(messageOrProps: unknown): void {
  showNotification(toProps(toErrorProps(messageOrProps), "error"))
}

export function showSuccessNotification(messageOrProps: MessageOrProps): void {
  showNotification(toProps(messageOrProps, "success"))
}

function showNotification({
  autoCloseDelay: autoClose,
  message,
  title,
}: ShowNotificationProps): void {
  notifications.show({
    autoClose,
    message,
    title,
  })
}

function toError(error: unknown): Error {
  return error instanceof Error
    ? error
    : new Error("An unexpected error occured")
}

function toErrorProps(messageOrProps: unknown): MessageOrProps {
  if (typeof messageOrProps === "string") return messageOrProps

  const parseOutput = v.safeParse(propsSchema, messageOrProps)
  if (parseOutput.success) return parseOutput.output

  return messageOrProps instanceof Error
    ? messageOrProps.message
    : toError(messageOrProps).message
}

function toProps(
  messageOrProps: MessageOrProps,
  kind: ShowNotificationProps["kind"]
): ShowNotificationProps {
  const defaults = {
    autoCloseDelay: 3000,
    title: kind === "error" ? "Error" : "Success",
  }

  return typeof messageOrProps === "string"
    ? { ...defaults, kind, message: messageOrProps }
    : {
        ...messageOrProps,
        autoCloseDelay:
          messageOrProps.autoCloseDelay ?? defaults.autoCloseDelay,
        kind,
        title: messageOrProps.title ?? defaults.title,
      }
}
