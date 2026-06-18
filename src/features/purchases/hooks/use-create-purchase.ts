'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import { eventQueryKeys } from '@/features/events/constants/query-keys'
import { purchaseService } from '@/features/purchases/services/purchase-service'
import type { CreatePurchaseRequest } from '@/features/purchases/types/purchase-types'

type CreatePurchaseVariables = CreatePurchaseRequest & {
  eventId: number
}

export function useCreatePurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ticket_ids, card_token }: CreatePurchaseVariables) =>
      purchaseService.createPurchase({ ticket_ids, card_token }),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: eventQueryKeys.tickets(variables.eventId)
        }),
        queryClient.invalidateQueries({
          queryKey: customerQueryKeys.purchases()
        })
      ])
    }
  })
}
