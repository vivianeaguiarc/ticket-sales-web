'use client'

import Link from 'next/link'
import { use } from 'react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { EventDetailsHeader } from '@/features/events/components/event-details-header'
import { EventTicketsList } from '@/features/events/components/event-tickets-list'
import { EventsErrorState } from '@/features/events/components/events-error-state'
import { useEventDetails } from '@/features/events/hooks/use-event-details'
import { useEventTickets } from '@/features/events/hooks/use-event-tickets'

type EventDetailsPageContentProps = {
  params: Promise<{ id: string }>
}

export function EventDetailsPageContent({ params }: EventDetailsPageContentProps) {
  const { id } = use(params)
  const { user } = useAuth()
  const { event, isLoading, isError, isNotFound, errorMessage, refetch } = useEventDetails(id)
  const canPurchase = user?.role === 'customer'
  const {
    tickets,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
    requiresAuth,
    errorMessage: ticketsErrorMessage,
    refetch: refetchTickets
  } = useEventTickets(event?.id ?? null)

  if (isNotFound) {
    return (
      <section className="bg-brand-cream py-12 sm:py-16">
        <Container className="max-w-2xl">
          <EventsErrorState message="Evento não encontrado ou link inválido." onRetry={undefined} />
          <div className="mt-6 text-center">
            <Button variant="outline" render={<Link href="/events" />}>
              Voltar para eventos
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-brand-cream py-12 sm:py-16">
      <Container className="space-y-10">
        <div>
          <Button
            variant="ghost"
            className="mb-4 px-0 hover:bg-transparent"
            render={<Link href="/events" />}
          >
            ← Voltar para eventos
          </Button>

          {isLoading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Carregando detalhes do evento">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : null}

          {!isLoading && isError ? (
            <EventsErrorState message={errorMessage ?? undefined} onRetry={() => refetch()} />
          ) : null}

          {!isLoading && !isError && event ? <EventDetailsHeader event={event} /> : null}
        </div>

        {!isLoading && !isError && event ? (
          <EventTicketsList
            eventId={event.id}
            tickets={tickets}
            isLoading={isTicketsLoading}
            isError={isTicketsError}
            requiresAuth={requiresAuth}
            canPurchase={canPurchase}
            errorMessage={ticketsErrorMessage}
            onRetry={() => refetchTickets()}
          />
        ) : null}
      </Container>
    </section>
  )
}
