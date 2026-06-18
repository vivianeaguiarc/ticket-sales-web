'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { HAS_CUSTOMER_RESERVATIONS_LIST_ENDPOINT } from '@/features/customer/constants/api-limitations'
import { customerQueryKeys } from '@/features/customer/constants/query-keys'
import type { CustomerReservation } from '@/features/customer/types/customer-dashboard-types'

function sortReservations(reservations: CustomerReservation[]): CustomerReservation[] {
  return [...reservations].sort(
    (a, b) => new Date(b.reservation_date).getTime() - new Date(a.reservation_date).getTime()
  )
}

/**
 * Sem endpoint GET no Swagger — lê apenas cache em memória da sessão atual.
 */
export function useCustomerReservations() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: customerQueryKeys.reservations(),
    queryFn: async () => {
      if (HAS_CUSTOMER_RESERVATIONS_LIST_ENDPOINT) {
        // TODO: chamar reservationService.listByCustomer() quando a API expor o endpoint.
        return []
      }

      return queryClient.getQueryData<CustomerReservation[]>(customerQueryKeys.reservations()) ?? []
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchInterval: 60_000
  })

  return {
    reservations: sortReservations(query.data ?? []),
    isLoading: query.isLoading,
    isError: query.isError,
    hasListEndpoint: HAS_CUSTOMER_RESERVATIONS_LIST_ENDPOINT,
    isSessionCache: !HAS_CUSTOMER_RESERVATIONS_LIST_ENDPOINT,
    refetch: query.refetch
  }
}
