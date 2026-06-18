'use client'

import { useMemo, useState } from 'react'

import { useCancelPurchase } from '@/features/customer/hooks/use-cancel-purchase'
import { useCustomerPurchases } from '@/features/customer/hooks/use-customer-purchases'
import { useCustomerReservations } from '@/features/customer/hooks/use-customer-reservations'
import { buildDashboardStats } from '@/features/customer/utils/dashboard-stats'

export function useCustomerDashboard() {
  const [cancellingPurchaseId, setCancellingPurchaseId] = useState<number | null>(null)

  const purchasesState = useCustomerPurchases()
  const reservationsState = useCustomerReservations()
  const cancelPurchase = useCancelPurchase()

  const stats = useMemo(
    () => buildDashboardStats(purchasesState.purchases, reservationsState.reservations),
    [purchasesState.purchases, reservationsState.reservations]
  )

  const isLoading = purchasesState.isLoading || reservationsState.isLoading
  const isError = purchasesState.isError || reservationsState.isError

  const handleCancelPurchase = async (purchaseId: number) => {
    setCancellingPurchaseId(purchaseId)

    try {
      await cancelPurchase.mutateAsync(purchaseId)
    } finally {
      setCancellingPurchaseId(null)
    }
  }

  return {
    stats,
    purchases: purchasesState.purchases,
    reservations: reservationsState.reservations,
    isLoading,
    isError,
    isSessionCache: purchasesState.isSessionCache && reservationsState.isSessionCache,
    cancellingPurchaseId,
    cancelPurchase,
    handleCancelPurchase,
    refetchPurchases: purchasesState.refetch,
    refetchReservations: reservationsState.refetch
  }
}
