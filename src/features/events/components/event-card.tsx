import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Event } from '@/features/events/types/event-types'
import { formatEventDateTime, truncateText } from '@/lib/utils/format'

type EventCardProps = {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const description = event.description
    ? truncateText(event.description, 120)
    : 'Confira os detalhes e garanta seu ingresso.'

  return (
    <Card className="h-full border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg text-brand-dark">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
            <time dateTime={event.date}>{formatEventDateTime(event.date)}</time>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
            <span className="line-clamp-1">{event.location}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          render={
            <Link href={`/events/${event.id}`} aria-label={`Ver detalhes de ${event.name}`} />
          }
        >
          Ver detalhes
          <ArrowRight className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
