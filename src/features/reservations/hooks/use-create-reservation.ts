'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import type { CustomerReservation } from '@/features/customer/types/customer-dashboard-types'
import { eventQueryKeys } from '@/features/events/constants/query-keys'
import { reservationService } from '@/features/reservations/services/reservation-service'
import type { CreateReservationRequest } from '@/features/reservations/types/reservation-types'

type CreateReservationVariables = CreateReservationRequest & {
  eventId: number
}

export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ticket_ids }: CreateReservationVariables) =>
      reservationService.createReservation({ ticket_ids }),
    onSuccess: async (reservations, variables) => {
      queryClient.setQueryData<CustomerReservation[]>(
        customerQueryKeys.reservations(),
        (current = []) => {
          const enriched = reservations.map((reservation) => ({
            ...reservation,
            event_id: variables.eventId
          }))

          const existingIds = new Set(current.map((item) => item.id))
          const merged = [...enriched.filter((item) => !existingIds.has(item.id)), ...current]

          return merged
        }
      )

      await queryClient.invalidateQueries({
        queryKey: eventQueryKeys.tickets(variables.eventId)
      })
    }
  })
}
