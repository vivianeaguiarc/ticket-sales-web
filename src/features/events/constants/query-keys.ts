export const eventQueryKeys = {
  all: ['events'] as const,
  lists: () => [...eventQueryKeys.all, 'list'] as const,
  list: (filters?: { search?: string; location?: string }) =>
    [...eventQueryKeys.lists(), filters ?? {}] as const,
  details: () => [...eventQueryKeys.all, 'detail'] as const,
  detail: (eventId: number) => [...eventQueryKeys.details(), eventId] as const,
  tickets: (eventId: number) => [...eventQueryKeys.all, 'tickets', eventId] as const
}
