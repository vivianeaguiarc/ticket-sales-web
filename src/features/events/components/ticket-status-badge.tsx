import type { TicketStatus } from '@/features/events/types/event-types'
import { cn } from '@/lib/utils'

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  available: {
    label: 'Disponível',
    className: 'bg-emerald-100 text-emerald-800'
  },
  reserved: {
    label: 'Reservado',
    className: 'bg-amber-100 text-amber-800'
  },
  sold: {
    label: 'Vendido',
    className: 'bg-muted text-muted-foreground'
  }
}

type TicketStatusBadgeProps = {
  status: TicketStatus
  className?: string
}

export function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2 py-0.5 text-xs font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
