import React from "react"
import { Group, Tooltip } from "@mantine/core"
import { Star } from "lucide-react"
import { Star as StarEmpty } from "lucide-react"

type RatingStarsProps = {
  ratio: number
}

export function RatingStars({ ratio }: RatingStarsProps): React.JSX.Element {
  const getStarsCount = (ratio: number): number => {
    if (ratio >= 7) return 5
    if (ratio >= 5) return 4
    if (ratio >= 4.5) return 3
    if (ratio >= 3) return 2
    return 1
  }

  const starsCount = getStarsCount(ratio)

  const getRatingDescription = (starsCount: number): string => {
    switch (starsCount) {
      case 5:
        return "Excellent contrast - Meets highest standards"
      case 4:
        return "Very good contrast"
      case 3:
        return "Good contrast - Meets minimum standards"
      case 2:
        return "Fair contrast - Only suitable for large text"
      case 1:
        return "Poor contrast - Not accessible"
      default:
        return ""
    }
  }

  return (
    <Tooltip label={getRatingDescription(starsCount)}>
      <Group gap={2}>
        {[...Array(5)].map((_, i) =>
          i < starsCount ? (
            <Star key={i} size={16} className="text-yellow-500" />
          ) : (
            <StarEmpty key={i} size={16} className="text-gray-300" />
          )
        )}
      </Group>
    </Tooltip>
  )
}
