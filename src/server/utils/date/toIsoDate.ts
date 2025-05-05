export function toIsoDate(date: Date): string {
  return date.toISOString().substring(0, 10)
}
