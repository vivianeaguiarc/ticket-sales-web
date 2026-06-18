'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { eventQueryKeys } from '@/features/events/constants/query-keys'
import { eventService } from '@/features/events/services/event-service'
import { getApiErrorMessage } from '@/lib/api/api-error'

export function useEventTickets(eventId: number | null) {
  const { isAuthenticated } = useAuth()

  const query = useQuery({
    queryKey: eventQueryKeys.tickets(eventId ?? 0),
    queryFn: () => eventService.getEventTickets(eventId!),
    enabled: Boolean(eventId && isAuthenticated),
    staleTime: 30 * 1000
  })

  return {
    tickets: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    isAuthenticated,
    requiresAuth: !isAuthenticated,
    errorMessage: query.isError ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch
  }
}
