'use client'

import { Container } from '@/components/layout/container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomerDashboardHeader } from '@/features/customer/components/customer-dashboard-header'
import { CustomerPurchasesList } from '@/features/customer/components/customer-purchases-list'
import { CustomerReservationsList } from '@/features/customer/components/customer-reservations-list'
import { CustomerStatsCards } from '@/features/customer/components/customer-stats-cards'
import { useCustomerDashboard } from '@/features/customer/hooks/use-customer-dashboard'

export function CustomerDashboardContent() {
  const {
    stats,
    purchases,
    reservations,
    isSummaryLoading,
    purchasesState,
    reservationsState,
    cancellingPurchaseId,
    handleCancelPurchase
  } = useCustomerDashboard()

  return (
    <section className="bg-brand-cream py-12 sm:py-16">
      <Container className="space-y-10">
        <CustomerDashboardHeader />

        {isSummaryLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="border-border bg-white">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-28" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <CustomerStatsCards stats={stats} />
        )}

        <CustomerReservationsList
          reservations={reservations}
          isLoading={reservationsState.isLoading}
          isError={reservationsState.isError}
          errorMessage={reservationsState.errorMessage}
          onRetry={() => reservationsState.refetch()}
        />

        <CustomerPurchasesList
          purchases={purchases}
          isLoading={purchasesState.isLoading}
          isError={purchasesState.isError}
          errorMessage={purchasesState.errorMessage}
          cancellingPurchaseId={cancellingPurchaseId}
          onRetry={() => purchasesState.refetch()}
          onCancelPurchase={handleCancelPurchase}
        />
      </Container>
    </section>
  )
}
