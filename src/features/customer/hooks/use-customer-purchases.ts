'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { HAS_CUSTOMER_PURCHASES_LIST_ENDPOINT } from '@/features/customer/constants/api-limitations'
import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import type { CustomerPurchase } from '@/features/customer/types/customer-dashboard-types'

function sortPurchases(purchases: CustomerPurchase[]): CustomerPurchase[] {
  return [...purchases].sort(
    (a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime()
  )
}

/**
 * Sem endpoint GET no Swagger — lê apenas cache em memória da sessão atual.
 */
export function useCustomerPurchases() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: customerQueryKeys.purchases(),
    queryFn: async () => {
      if (HAS_CUSTOMER_PURCHASES_LIST_ENDPOINT) {
        // TODO: chamar purchaseService.listByCustomer() quando a API expor o endpoint.
        return []
      }

      return queryClient.getQueryData<CustomerPurchase[]>(customerQueryKeys.purchases()) ?? []
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })

  return {
    purchases: sortPurchases(query.data ?? []),
    isLoading: query.isLoading,
    isError: query.isError,
    hasListEndpoint: HAS_CUSTOMER_PURCHASES_LIST_ENDPOINT,
    isSessionCache: !HAS_CUSTOMER_PURCHASES_LIST_ENDPOINT,
    refetch: query.refetch
  }
}
