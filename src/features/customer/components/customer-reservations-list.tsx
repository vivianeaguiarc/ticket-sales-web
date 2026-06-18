import { Bookmark, CalendarDays, Clock3, MapPin } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardEmptyState } from '@/features/customer/components/dashboard-empty-state'
import { DashboardErrorState } from '@/features/customer/components/dashboard-error-state'
import { DashboardLoadingState } from '@/features/customer/components/dashboard-loading-state'
import { StatusBadge } from '@/features/customer/components/status-badge'
import type { CustomerReservation } from '@/features/customer/types/customer-dashboard-types'
import { getReservationDisplayStatus } from '@/features/customer/utils/reservation-status'
import { formatCurrency, formatEventDateTime } from '@/lib/utils/format'

type CustomerReservationsListProps = {
  reservations: CustomerReservation[]
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string | null
  onRetry?: () => void
}

export function CustomerReservationsList({
  reservations,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry
}: CustomerReservationsListProps) {
  return (
    <section aria-labelledby="customer-reservations-title">
      <div className="mb-4 flex items-center gap-2">
        <Bookmark className="size-5 text-primary" aria-hidden />
        <h2 id="customer-reservations-title" className="text-xl font-bold text-brand-dark">
          Minhas reservas
        </h2>
      </div>

      {isLoading ? <DashboardLoadingState /> : null}

      {!isLoading && isError ? (
        <DashboardErrorState message={errorMessage ?? undefined} onRetry={onRetry} />
      ) : null}

      {!isLoading && !isError && reservations.length === 0 ? (
        <DashboardEmptyState title="Nenhuma reserva encontrada" />
      ) : null}

      {!isLoading && !isError && reservations.length > 0 ? (
        <div className="space-y-3">
          {reservations.map((reservation) => {
            const displayStatus = getReservationDisplayStatus(reservation)
            const { ticket } = reservation
            const purchaseHref = `/customer/purchase/${ticket.event.id}`

            return (
              <Card key={reservation.id} className="border-border bg-white">
                <CardContent className="space-y-4 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-brand-dark">{ticket.event.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Ingresso #{ticket.id} · {ticket.location}
                      </p>
                    </div>
                    <StatusBadge status={displayStatus} />
                  </div>

                  <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
                      Reservado em {formatEventDateTime(reservation.reservation_date)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock3 className="size-4 shrink-0 text-primary" aria-hidden />
                      Expira em {formatEventDateTime(reservation.expires_at)}
                    </p>
                    <p className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
                      {ticket.event.location}
                    </p>
                    <p className="font-medium text-brand-dark sm:col-span-2">
                      Valor: {formatCurrency(ticket.price)}
                    </p>
                  </div>

                  {displayStatus === 'reserved' ? (
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      render={<Link href={purchaseHref} />}
                    >
                      Finalizar compra
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
