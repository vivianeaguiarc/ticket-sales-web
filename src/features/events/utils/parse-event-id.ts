export function parseEventId(value: string): number | null {
  const eventId = Number(value)

  if (!Number.isInteger(eventId) || eventId <= 0) {
    return null
  }

  return eventId
}
