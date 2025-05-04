import React from "react"
import { Paper, Text, Group, Stack, Title } from "@mantine/core"
import { StatusMessage } from "./StatusMessage"
import { RatingStars } from "./RatingStars"
import { ContrastResult } from "./contrastTypes"
import { formatContrastRatio } from "./contrastUtils"

type ContrastResultCardProps = {
  result: ContrastResult
}

export function ContrastResultCard({
  result,
}: ContrastResultCardProps): React.JSX.Element {
  const { ratio, normalText, largeText } = result

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <div>
          <Text size="sm" fw={500} color="dimmed">
            Contrast ratio
          </Text>
          <Group justify="space-between" align="flex-end" gap="xs">
            <Title order={2}>{formatContrastRatio(ratio)}</Title>
            <RatingStars ratio={ratio} />
          </Group>
        </div>

        <Group justify="space-between" align="flex-start" gap="md">
          <div>
            <Text size="sm" color="dimmed" mb={4}>
              Normal Text
            </Text>
            <StatusMessage level={normalText} />
          </div>

          <div>
            <Text size="sm" color="dimmed" mb={4}>
              Large Text
            </Text>
            <Group gap="xs">
              <StatusMessage level={largeText} isLargeText={true} />
              {largeText !== "FAIL" && <Text size="xs">✓</Text>}
            </Group>
          </div>
        </Group>
      </Stack>
    </Paper>
  )
}
