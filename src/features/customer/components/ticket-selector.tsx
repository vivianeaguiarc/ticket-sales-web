'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { TicketStatusBadge } from '@/features/events/components/ticket-status-badge'
import type { Ticket } from '@/features/events/types/event-types'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/format'

type TicketSelectorProps = {
  tickets: Ticket[]
  selectedTicketIds: number[]
  onToggle: (ticketId: number, checked: boolean) => void
}

export function TicketSelector({ tickets, selectedTicketIds, onToggle }: TicketSelectorProps) {
  const availableTickets = tickets.filter((ticket) => ticket.status === 'available')

  if (availableTickets.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Não há ingressos disponíveis para seleção no momento.
      </p>
    )
  }

  return (
    <div className="space-y-3" role="group" aria-label="Selecionar ingressos disponíveis">
      {availableTickets.map((ticket) => {
        const inputId = `ticket-${ticket.id}`
        const isSelected = selectedTicketIds.includes(ticket.id)

        return (
          <label
            key={ticket.id}
            htmlFor={inputId}
            className={cn(
              'flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors',
              isSelected ? 'border-primary bg-brand-soft/40' : 'border-border bg-white'
            )}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id={inputId}
                checked={isSelected}
                onCheckedChange={(checked) => onToggle(ticket.id, checked === true)}
              />
              <div>
                <p className="font-medium text-brand-dark">Ingresso #{ticket.id}</p>
                <p className="text-sm text-muted-foreground">Setor {ticket.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">{formatCurrency(ticket.price)}</p>
              <TicketStatusBadge status={ticket.status} />
            </div>
          </label>
        )
      })}
    </div>
  )
}
