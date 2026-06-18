import { CalendarDays, MapPin } from 'lucide-react'

import type { EventDetails } from '@/features/events/types/event-types'
import { formatEventDateTime } from '@/lib/utils/format'

type EventDetailsHeaderProps = {
  event: EventDetails
}

export function EventDetailsHeader({ event }: EventDetailsHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
        Evento
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
        {event.name}
      </h1>
      <div className="flex flex-col gap-2 text-muted-foreground sm:flex-row sm:gap-6">
        <p className="flex items-center gap-2 text-sm sm:text-base">
          <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
          <time dateTime={event.date}>{formatEventDateTime(event.date)}</time>
        </p>
        <p className="flex items-center gap-2 text-sm sm:text-base">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
          <span>{event.location}</span>
        </p>
      </div>
      {event.description ? (
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      ) : null}
    </header>
  )
}
