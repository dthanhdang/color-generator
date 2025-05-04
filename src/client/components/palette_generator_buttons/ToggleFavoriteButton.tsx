import type { JSX } from "react"
import { Button } from "@mantine/core"
import { Heart } from "lucide-react"
import type { ButtonProps, PolymorphicComponentProps } from "@mantine/core"

import type { Color } from "chroma-js"
import { getUserFromLocalStorage } from "#client/auth"
import { listCurrentUserFavoritePalettes } from "#client/rpc/current_user"
import { useQuery } from "@tanstack/react-query"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"
import { useToggleFavoritePalette } from "#client/hooks"

function getQuery(colors: string) {
  return getUserFromLocalStorage("registered_user") !== undefined
    ? {
        queryFn: () => listCurrentUserFavoritePalettes({ colors }),
        queryKey: ["CURRENT_USER", "PALETTE", "FAVORITE", "COLORS", colors],
      }
    : {
        queryFn: async () => [],
        queryKey: ["CURRENT_USER", "PALETTE", "FAVORITE", "EMPTY"],
      }
}

type ToggleFavoriteButtonProps = Omit<
  PolymorphicComponentProps<"button", ButtonProps>,
  "children"
> & { colors: Color[] }

export function ToggleFavoriteButton({
  className,
  colors,
  ...props
}: ToggleFavoriteButtonProps): JSX.Element {
  const { data: palettes } = useQuery(getQuery(stringifyChromaPalette(colors)))
  const { isFavorite, isUpdatePending, toggleFavorite } =
    useToggleFavoritePalette({
      defaultIsFavorite: palettes !== undefined && palettes.length > 0,
    })

  return (
    <>
      <Button
        {...props}
        className={className}
        loading={isUpdatePending}
        leftSection={
          <Heart
            size={16}
            className={isFavorite ? "fill-current" : undefined}
          />
        }
        onClick={() => toggleFavorite(colors)}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </Button>
    </>
  )
}
