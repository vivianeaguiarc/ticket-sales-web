'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import type { CustomerPurchase } from '@/features/customer/types/customer-dashboard-types'
import { purchaseService } from '@/features/purchases/services/purchase-service'
import { getCancelPurchaseErrorMessage } from '@/lib/api/api-error'

export function useCancelPurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (purchaseId: number) => purchaseService.cancelPurchase(purchaseId),
    onSuccess: async (_, purchaseId) => {
      queryClient.setQueryData<CustomerPurchase[]>(customerQueryKeys.purchases(), (current = []) =>
        current.map((purchase) =>
          purchase.id === purchaseId ? { ...purchase, status: 'cancelled' } : purchase
        )
      )

      toast.success('Compra cancelada com sucesso.')
    },
    onError: (error) => {
      toast.error(getCancelPurchaseErrorMessage(error))
    }
  })
}
