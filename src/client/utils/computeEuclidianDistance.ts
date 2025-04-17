export function computeEuclidianDistance(
  positions: [number, number][]
): number {
  return Math.sqrt(
    positions.reduce((total, [d1, d2]) => total + Math.pow(d2 - d1, 2), 0)
  )
}
