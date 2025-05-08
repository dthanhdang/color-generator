import { ActionIcon, Group } from "@mantine/core"
import { Heart } from "lucide-react"
import { JSX } from "react"

type LikesCounterProps = {
  isFavorite?: boolean
  likes: number
  onToggleFavorite?: () => void
}

export function LikesCounter({
  isFavorite,
  likes,
  onToggleFavorite,
}: LikesCounterProps): JSX.Element {
  const handleToggleFavorite = (): void => {
    if (onToggleFavorite) onToggleFavorite()
  }

  return (
    <Group className="items-center gap-2 bold">
      <ActionIcon
        className="disabled:bg-transparent"
        disabled={!onToggleFavorite}
        onClick={handleToggleFavorite}
        variant="transparent"
      >
        <Heart
          className={onToggleFavorite ? "stroke-current" : "stroke-gray-300"}
          fill={isFavorite ? "currentColor" : "white"}
        />
      </ActionIcon>
      <p className="font-bold">{likes.toString()}</p>
    </Group>
  )
}
