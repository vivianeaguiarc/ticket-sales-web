'use client'

import Link from 'next/link'
import { use } from 'react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { TicketPurchaseFlow } from '@/features/customer/components/ticket-purchase-flow'
import { EventDetailsHeader } from '@/features/events/components/event-details-header'
import { EventsErrorState } from '@/features/events/components/events-error-state'
import { useEventDetails } from '@/features/events/hooks/use-event-details'

type CustomerPurchasePageContentProps = {
  params: Promise<{ eventId: string }>
}

function CustomerPurchaseContent({ eventIdParam }: { eventIdParam: string }) {
  const { event, isLoading, isError, isNotFound, errorMessage, refetch } =
    useEventDetails(eventIdParam)

  if (isNotFound) {
    return (
      <Container className="max-w-2xl">
        <EventsErrorState message="Evento não encontrado ou link inválido." />
        <div className="mt-6 text-center">
          <Button variant="outline" render={<Link href="/events" />}>
            Voltar para eventos
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="space-y-8">
      <div>
        <Button
          variant="ghost"
          className="mb-4 px-0 hover:bg-transparent"
          render={<Link href={`/events/${eventIdParam}`} />}
        >
          ← Voltar para o evento
        </Button>

        {isLoading ? (
          <div className="space-y-4" aria-busy="true">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        ) : null}

        {!isLoading && isError ? (
          <EventsErrorState message={errorMessage ?? undefined} onRetry={() => refetch()} />
        ) : null}

        {!isLoading && !isError && event ? <EventDetailsHeader event={event} /> : null}
      </div>

      {!isLoading && !isError && event ? <TicketPurchaseFlow event={event} /> : null}
    </Container>
  )
}

export function CustomerPurchasePageContent({ params }: CustomerPurchasePageContentProps) {
  const { eventId } = use(params)

  return (
    <section className="bg-brand-cream py-12 sm:py-16">
      <ProtectedRoute allowedRole="customer">
        <CustomerPurchaseContent eventIdParam={eventId} />
      </ProtectedRoute>
    </section>
  )
}
