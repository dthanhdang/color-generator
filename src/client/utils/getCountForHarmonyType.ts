import type { HarmonyType } from "./colorHarmony.ts"

const harmonyCounts: Record<HarmonyType, number> = {
  monochromatic: 5,
  analogous: 5,
  complementary: 5,
  triadic: 3,
  tetradic: 4,
  "split-complementary": 5,
}

export function getCountForHarmonyType(harmonyType: HarmonyType): number {
  return harmonyCounts[harmonyType] || 5
}
