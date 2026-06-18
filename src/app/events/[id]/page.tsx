import type { Metadata } from 'next'

import { EventDetailsPageContent } from '@/features/events/components/event-details-page-content'

export const metadata: Metadata = {
  title: 'Detalhes do evento'
}

type EventDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  return <EventDetailsPageContent params={params} />
}
