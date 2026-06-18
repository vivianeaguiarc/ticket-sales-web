'use client'

import { useState } from 'react'

import { Container } from '@/components/layout/container'
import { EventCard } from '@/features/events/components/event-card'
import { EventListSkeleton } from '@/features/events/components/event-card-skeleton'
import { EventSearchBar } from '@/features/events/components/event-search-bar'
import { EventsEmptyState } from '@/features/events/components/events-empty-state'
import { EventsErrorState } from '@/features/events/components/events-error-state'
import { useEvents } from '@/features/events/hooks/use-events'

export function EventsPageContent() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const { events, isLoading, isError, errorMessage, refetch } = useEvents({ search, location })

  return (
    <section className="bg-brand-cream py-12 sm:py-16">
      <Container>
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">Eventos disponíveis</h1>
          <p className="max-w-2xl text-muted-foreground">
            Explore shows, festivais e experiências com dados em tempo real da API Ticket Sales.
          </p>
        </div>

        <div className="mb-8">
          <EventSearchBar
            search={search}
            location={location}
            onSearchChange={setSearch}
            onLocationChange={setLocation}
          />
        </div>

        {isLoading ? <EventListSkeleton /> : null}

        {!isLoading && isError ? (
          <EventsErrorState message={errorMessage ?? undefined} onRetry={() => refetch()} />
        ) : null}

        {!isLoading && !isError && events.length === 0 ? <EventsEmptyState /> : null}

        {!isLoading && !isError && events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
