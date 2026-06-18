'use client'

import { CalendarDays, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { EventCard } from '@/features/events/components/event-card'
import { EventCardSkeleton } from '@/features/events/components/event-card-skeleton'
import { EventsEmptyState } from '@/features/events/components/events-empty-state'
import { EventsErrorState } from '@/features/events/components/events-error-state'
import { useEvents } from '@/features/events/hooks/use-events'

const FEATURED_EVENTS_LIMIT = 4

export function FeaturedEventsSection() {
  const { events, isLoading, isError, errorMessage, refetch } = useEvents()
  const featuredEvents = events.slice(0, FEATURED_EVENTS_LIMIT)

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-primary" />
            <h2 className="text-2xl font-bold text-brand-dark">Eventos em destaque</h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Ver todos os eventos
            <ChevronRight className="size-4" />
          </Link>
        </div>

        {isLoading ? (
          <div
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
            aria-busy="true"
            aria-label="Carregando eventos em destaque"
          >
            {Array.from({ length: FEATURED_EVENTS_LIMIT }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!isLoading && isError ? (
          <EventsErrorState
            message={errorMessage ?? 'Não foi possível carregar os eventos em destaque.'}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isLoading && !isError && featuredEvents.length === 0 ? (
          <EventsEmptyState
            title="Nenhum evento em destaque"
            description="Novos eventos serão exibidos aqui assim que estiverem disponíveis na plataforma."
          />
        ) : null}

        {!isLoading && !isError && featuredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : null}

        {!isLoading && !isError && featuredEvents.length > 0 ? (
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" render={<Link href="/events" />}>
              Ver todos os eventos
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
