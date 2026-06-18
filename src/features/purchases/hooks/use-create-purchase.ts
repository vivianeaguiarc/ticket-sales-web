'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import type { CustomerPurchase } from '@/features/customer/types/customer-dashboard-types'
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
    onSuccess: async (purchase, variables) => {
      queryClient.setQueryData<CustomerPurchase[]>(
        customerQueryKeys.purchases(),
        (current = []) => {
          const nextPurchase: CustomerPurchase = {
            ...purchase,
            tickets: variables.ticket_ids.map((ticketId) => ({ ticket_id: ticketId }))
          }

          return [nextPurchase, ...current.filter((item) => item.id !== purchase.id)]
        }
      )

      await queryClient.invalidateQueries({
        queryKey: eventQueryKeys.tickets(variables.eventId)
      })
    }
  })
}
