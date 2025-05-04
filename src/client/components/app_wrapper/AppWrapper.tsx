import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StrictMode } from "react"
import type { JSX } from "react"

const inputClassNames = {
  description: "text-base",
  error: "text-lg",
  label: "text-lg font-[Inter] text-[#707070]",
  root: "flex flex-col gap-1",
}

type AppWrapperProps = {
  children: React.ReactNode
  queryClient: QueryClient
}

export function AppWrapper({
  children,
  queryClient,
}: AppWrapperProps): JSX.Element {
  return (
    <StrictMode>
      <MantineProvider
        theme={{
          colors: {
            "royal-blue": [
              "#eeeaff",
              "#d6d1ff",
              "#aaa0fd",
              "#7b6bf9",
              "oklch(0.511 0.262 276.966)",
              "#3b22f5",
              "#2d13f5",
              "#1f08db",
              "#1705c5",
              "#0b01ad",
            ],
          },
          components: {
            InputWrapper: {
              classNames: inputClassNames,
            },
            Textarea: {
              classNames: {
                ...inputClassNames,
                input: "text-lg font-[Inter] text-[#202020]",
              },
            },
            TextInput: {
              classNames: {
                ...inputClassNames,
                input: "text-lg rounded-sm font-[Inter] text-[#202020]",
              },
            },
          },
          primaryColor: "royal-blue",
          primaryShade: 4,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <ModalsProvider>{children}</ModalsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  )
}
