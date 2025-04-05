import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import type { JSX } from "react";

type AppWrapperProps = {
  children: React.ReactNode;
  queryClient: QueryClient;
};

export function AppWrapper({
  children,
  queryClient,
}: AppWrapperProps): JSX.Element {
  return (
    <StrictMode>
      <MantineProvider
        theme={{
          components: {},
        }}
      >
        <Notifications />
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </StrictMode>
  );
}
