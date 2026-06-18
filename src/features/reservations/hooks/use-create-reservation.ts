'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
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
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: eventQueryKeys.tickets(variables.eventId)
        }),
        queryClient.invalidateQueries({
          queryKey: customerQueryKeys.reservations()
        })
      ])
    }
  })
}
