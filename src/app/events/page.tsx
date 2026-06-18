import type { Metadata } from 'next'

import { EventsPageContent } from '@/features/events/components/events-page-content'

export const metadata: Metadata = {
  title: 'Eventos disponíveis'
}

export default function EventsPage() {
  return <EventsPageContent />
}
