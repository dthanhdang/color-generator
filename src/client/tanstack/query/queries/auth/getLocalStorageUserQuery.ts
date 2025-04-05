import type { LocalStorageUser } from "#client/types";
import type { UseSuspenseQueryOptions } from "@tanstack/react-query";

import { getUserFromLocalStorage } from "#client/auth";

export const getLocalStorageUserQuery: UseSuspenseQueryOptions<LocalStorageUser | null> =
  {
    queryFn: () => {
      const user = getUserFromLocalStorage();

      return user ?? null;
    },
    queryKey: ["LOCAL_STORAGE_USER"],
  };
