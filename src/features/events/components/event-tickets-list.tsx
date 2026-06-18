'use client'

import { Ticket } from 'lucide-react'
import Link from 'next/link'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EventsEmptyState } from '@/features/events/components/events-empty-state'
import { EventsErrorState } from '@/features/events/components/events-error-state'
import { TicketStatusBadge } from '@/features/events/components/ticket-status-badge'
import type { Ticket as EventTicket } from '@/features/events/types/event-types'
import { formatCurrency } from '@/lib/utils/format'

type EventTicketsListProps = {
  tickets: EventTicket[]
  isLoading: boolean
  isError: boolean
  requiresAuth: boolean
  errorMessage?: string | null
  onRetry?: () => void
}

export function EventTicketsList({
  tickets,
  isLoading,
  isError,
  requiresAuth,
  errorMessage,
  onRetry
}: EventTicketsListProps) {
  if (requiresAuth) {
    return (
      <Card className="border-border bg-white">
        <CardHeader>
          <CardTitle className="text-brand-dark">Ingressos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Faça login ou crie uma conta para visualizar ingressos disponíveis e reservar ou
            comprar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              render={<Link href="/login" />}
            >
              Entrar
            </Button>
            <Button variant="outline" render={<Link href="/register/customer" />}>
              Criar conta
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="border-border bg-white">
        <CardContent className="py-10">
          <LoadingSpinner label="Carregando ingressos..." />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return <EventsErrorState message={errorMessage ?? undefined} onRetry={onRetry} />
  }

  if (tickets.length === 0) {
    return (
      <EventsEmptyState
        title="Ingressos indisponíveis"
        description="Este evento ainda não possui ingressos cadastrados ou todos já foram vendidos."
      />
    )
  }

  const availableCount = tickets.filter((ticket) => ticket.status === 'available').length

  return (
    <section aria-labelledby="event-tickets-title">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="event-tickets-title" className="text-xl font-bold text-brand-dark">
            Ingressos
          </h2>
          <p className="text-sm text-muted-foreground">
            {availableCount > 0
              ? `${availableCount} ingresso(s) disponível(is) para compra ou reserva.`
              : 'No momento não há ingressos disponíveis.'}
          </p>
        </div>
        {availableCount > 0 ? (
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            render={<Link href="/login" />}
          >
            <Ticket className="size-4" />
            Reservar / Comprar
          </Button>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium" scope="col">
                  Ingresso
                </th>
                <th className="px-4 py-3 font-medium" scope="col">
                  Setor
                </th>
                <th className="px-4 py-3 font-medium" scope="col">
                  Preço
                </th>
                <th className="px-4 py-3 font-medium" scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 font-medium text-brand-dark">#{ticket.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{ticket.location}</td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {formatCurrency(ticket.price)}
                  </td>
                  <td className="px-4 py-3">
                    <TicketStatusBadge status={ticket.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
