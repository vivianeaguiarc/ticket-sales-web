'use client'

import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { eventQueryKeys } from '@/features/events/constants/query-keys'
import { eventService } from '@/features/events/services/event-service'
import { parseEventId } from '@/features/events/utils/parse-event-id'
import { getApiErrorMessage } from '@/lib/api/api-error'

export function useEventDetails(eventIdParam: string) {
  const eventId = parseEventId(eventIdParam)
  const isValidId = eventId !== null

  const query = useQuery({
    queryKey: eventQueryKeys.detail(eventId ?? 0),
    queryFn: () => eventService.getEventById(eventIdParam),
    enabled: isValidId,
    staleTime: 60 * 1000
  })

  const isNotFound =
    !isValidId ||
    (query.isError && isAxiosError(query.error) && query.error.response?.status === 404)

  return {
    event: query.data ?? null,
    eventId,
    isValidId,
    isLoading: isValidId && query.isLoading,
    isError: query.isError && !isNotFound,
    isNotFound,
    errorMessage: query.isError ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch
  }
}
