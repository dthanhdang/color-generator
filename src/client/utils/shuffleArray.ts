export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1))

    // Swap elements at indices i and j
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
