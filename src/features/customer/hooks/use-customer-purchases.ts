'use client'

import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import { customerService } from '@/features/customer/services/customer-service'
import type { CustomerPurchase } from '@/features/customer/types/customer-dashboard-types'
import { getDashboardErrorMessage } from '@/lib/api/api-error'

function sortPurchases(purchases: CustomerPurchase[]): CustomerPurchase[] {
  return [...purchases].sort(
    (a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime()
  )
}

export function useCustomerPurchases() {
  const query = useQuery({
    queryKey: customerQueryKeys.purchases(),
    queryFn: () => customerService.getPurchases(),
    staleTime: 30 * 1000
  })

  const isUnauthorized =
    query.isError && isAxiosError(query.error) && query.error.response?.status === 401

  return {
    purchases: sortPurchases(query.data ?? []),
    isLoading: query.isLoading,
    isError: query.isError,
    isUnauthorized,
    errorMessage: query.isError ? getDashboardErrorMessage(query.error) : null,
    refetch: query.refetch
  }
}
