import { CalendarX2 } from 'lucide-react'

type EventsEmptyStateProps = {
  title?: string
  description?: string
}

export function EventsEmptyState({
  title = 'Nenhum evento encontrado',
  description = 'Não há eventos disponíveis no momento. Tente ajustar os filtros ou volte mais tarde.'
}: EventsEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center"
      role="status"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-soft text-primary">
        <CalendarX2 className="size-6" aria-hidden />
      </div>
      <h2 className="text-lg font-semibold text-brand-dark">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
