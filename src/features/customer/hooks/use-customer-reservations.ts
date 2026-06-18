'use client'

import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import { customerService } from '@/features/customer/services/customer-service'
import type { CustomerReservation } from '@/features/customer/types/customer-dashboard-types'
import { getDashboardErrorMessage } from '@/lib/api/api-error'

function sortReservations(reservations: CustomerReservation[]): CustomerReservation[] {
  return [...reservations].sort(
    (a, b) => new Date(b.reservation_date).getTime() - new Date(a.reservation_date).getTime()
  )
}

export function useCustomerReservations() {
  const query = useQuery({
    queryKey: customerQueryKeys.reservations(),
    queryFn: () => customerService.getReservations(),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000
  })

  const isUnauthorized =
    query.isError && isAxiosError(query.error) && query.error.response?.status === 401

  return {
    reservations: sortReservations(query.data ?? []),
    isLoading: query.isLoading,
    isError: query.isError,
    isUnauthorized,
    errorMessage: query.isError ? getDashboardErrorMessage(query.error) : null,
    refetch: query.refetch
  }
}
