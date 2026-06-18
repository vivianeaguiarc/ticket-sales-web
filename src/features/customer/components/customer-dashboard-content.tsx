'use client'

import { Container } from '@/components/layout/container'
import { CustomerDashboardHeader } from '@/features/customer/components/customer-dashboard-header'
import { CustomerPurchasesList } from '@/features/customer/components/customer-purchases-list'
import { CustomerReservationsList } from '@/features/customer/components/customer-reservations-list'
import { CustomerStatsCards } from '@/features/customer/components/customer-stats-cards'
import { DashboardErrorState } from '@/features/customer/components/dashboard-error-state'
import { DashboardLoadingState } from '@/features/customer/components/dashboard-loading-state'
import { useCustomerDashboard } from '@/features/customer/hooks/use-customer-dashboard'

export function CustomerDashboardContent() {
  const {
    stats,
    purchases,
    reservations,
    isLoading,
    isError,
    isSessionCache,
    cancellingPurchaseId,
    handleCancelPurchase,
    refetchPurchases,
    refetchReservations
  } = useCustomerDashboard()

  if (isLoading) {
    return (
      <section className="bg-brand-cream py-12 sm:py-16">
        <Container className="space-y-8">
          <CustomerDashboardHeader isSessionCache={isSessionCache} />
          <DashboardLoadingState />
        </Container>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="bg-brand-cream py-12 sm:py-16">
        <Container className="space-y-8">
          <CustomerDashboardHeader isSessionCache={isSessionCache} />
          <DashboardErrorState
            onRetry={() => {
              void refetchPurchases()
              void refetchReservations()
            }}
          />
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-brand-cream py-12 sm:py-16">
      <Container className="space-y-10">
        <CustomerDashboardHeader isSessionCache={isSessionCache} />
        <CustomerStatsCards stats={stats} />
        <CustomerReservationsList reservations={reservations} />
        <CustomerPurchasesList
          purchases={purchases}
          cancellingPurchaseId={cancellingPurchaseId}
          onCancelPurchase={handleCancelPurchase}
        />
      </Container>
    </section>
  )
}
