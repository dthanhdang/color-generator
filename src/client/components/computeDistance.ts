export function computeDistance(coordinates: [number, number][]): number {
  return Math.sqrt(
    coordinates
      .map(([c1, c2]) => Math.pow(c2 - c1, 2))
      .reduce((total, value) => total + value, 0)
  )
}
