import { CalendarDays, ShoppingBag, Ticket } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardEmptyState } from '@/features/customer/components/dashboard-empty-state'
import { DashboardErrorState } from '@/features/customer/components/dashboard-error-state'
import { DashboardLoadingState } from '@/features/customer/components/dashboard-loading-state'
import { StatusBadge } from '@/features/customer/components/status-badge'
import type { CustomerPurchase } from '@/features/customer/types/customer-dashboard-types'
import { formatCurrency, formatEventDateTime } from '@/lib/utils/format'

type CustomerPurchasesListProps = {
  purchases: CustomerPurchase[]
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string | null
  cancellingPurchaseId?: number | null
  onRetry?: () => void
  onCancelPurchase?: (purchaseId: number) => void
}

function canCancelPurchase(status: CustomerPurchase['status']): boolean {
  return status === 'paid' || status === 'pending'
}

export function CustomerPurchasesList({
  purchases,
  isLoading = false,
  isError = false,
  errorMessage,
  cancellingPurchaseId,
  onRetry,
  onCancelPurchase
}: CustomerPurchasesListProps) {
  return (
    <section aria-labelledby="customer-purchases-title">
      <div className="mb-4 flex items-center gap-2">
        <ShoppingBag className="size-5 text-primary" aria-hidden />
        <h2 id="customer-purchases-title" className="text-xl font-bold text-brand-dark">
          Minhas compras
        </h2>
      </div>

      {isLoading ? <DashboardLoadingState /> : null}

      {!isLoading && isError ? (
        <DashboardErrorState message={errorMessage ?? undefined} onRetry={onRetry} />
      ) : null}

      {!isLoading && !isError && purchases.length === 0 ? (
        <DashboardEmptyState title="Nenhuma compra encontrada" />
      ) : null}

      {!isLoading && !isError && purchases.length > 0 ? (
        <div className="space-y-3">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="border-border bg-white">
              <CardContent className="space-y-4 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Compra #{purchase.id}</p>
                    <p className="mt-1 text-lg font-semibold text-brand-dark">
                      {formatCurrency(purchase.total_amount)}
                    </p>
                  </div>
                  <StatusBadge status={purchase.status} />
                </div>

                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
                  {formatEventDateTime(purchase.purchase_date)}
                </p>

                {purchase.tickets.length > 0 ? (
                  <div className="rounded-xl border border-border/70 bg-brand-cream/40 p-3">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-dark">
                      <Ticket className="size-4 text-primary" aria-hidden />
                      Ingressos vinculados
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {purchase.tickets.map((ticket) => (
                        <li
                          key={`${purchase.id}-ticket-${ticket.id}`}
                          className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span>
                            {ticket.event.name} · #{ticket.id} ({ticket.location})
                          </span>
                          <StatusBadge status={ticket.status} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="outline" size="sm" render={<Link href="/events" />}>
                    Ver eventos
                  </Button>

                  {canCancelPurchase(purchase.status) && onCancelPurchase ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive/30 text-destructive hover:bg-destructive/5"
                      disabled={cancellingPurchaseId === purchase.id}
                      onClick={() => onCancelPurchase(purchase.id)}
                    >
                      {cancellingPurchaseId === purchase.id ? 'Cancelando...' : 'Cancelar compra'}
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  )
}
