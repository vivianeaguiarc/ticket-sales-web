'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { eventQueryKeys } from '@/features/events/constants/query-keys'
import { eventService } from '@/features/events/services/event-service'
import type { Event } from '@/features/events/types/event-types'
import { getApiErrorMessage } from '@/lib/api/api-error'

type UseEventsOptions = {
  search?: string
  location?: string
}

function filterEvents(events: Event[], search?: string, location?: string): Event[] {
  const normalizedSearch = search?.trim().toLowerCase()
  const normalizedLocation = location?.trim().toLowerCase()

  return events.filter((event) => {
    const matchesSearch =
      !normalizedSearch ||
      event.name.toLowerCase().includes(normalizedSearch) ||
      event.description?.toLowerCase().includes(normalizedSearch)

    const matchesLocation =
      !normalizedLocation || event.location.toLowerCase().includes(normalizedLocation)

    return matchesSearch && matchesLocation
  })
}

export function useEvents(options: UseEventsOptions = {}) {
  const { search, location } = options

  const query = useQuery({
    queryKey: eventQueryKeys.list({ search, location }),
    queryFn: () => eventService.getEvents(),
    staleTime: 60 * 1000
  })

  const events = useMemo(
    () => filterEvents(query.data ?? [], search, location),
    [query.data, search, location]
  )

  return {
    events,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.isError ? getApiErrorMessage(query.error) : null,
    refetch: query.refetch
  }
}
