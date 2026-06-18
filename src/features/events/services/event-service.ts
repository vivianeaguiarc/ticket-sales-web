import type {
  Event,
  EventListResponse,
  EventTicketsResponse
} from '@/features/events/types/event-types'
import { parseEventId } from '@/features/events/utils/parse-event-id'
import { apiClient } from '@/lib/api/client'
import { endpoints } from '@/lib/api/endpoints'

function assertValidEventId(eventId: number): void {
  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw new Error('Invalid event id')
  }
}

export const eventService = {
  async getEvents(): Promise<EventListResponse> {
    const { data } = await apiClient.get<EventListResponse>(endpoints.events.list)

    return data
  },

  async getEventById(id: string | number): Promise<Event> {
    const eventId = typeof id === 'string' ? parseEventId(id) : id

    if (!eventId) {
      throw new Error('Invalid event id')
    }

    const { data } = await apiClient.get<Event>(endpoints.events.detail(eventId))

    return data
  },

  async getEventTickets(eventId: number): Promise<EventTicketsResponse> {
    assertValidEventId(eventId)

    const { data } = await apiClient.get<EventTicketsResponse>(
      endpoints.partners.eventTickets(eventId)
    )

    return data
  }
}
