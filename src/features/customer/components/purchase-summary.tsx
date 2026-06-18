import type { Ticket } from '@/features/events/types/event-types'
import { formatCurrency } from '@/lib/utils/format'

type PurchaseSummaryProps = {
  selectedTickets: Ticket[]
}

export function PurchaseSummary({ selectedTickets }: PurchaseSummaryProps) {
  const total = selectedTickets.reduce((sum, ticket) => sum + ticket.price, 0)

  return (
    <aside
      className="rounded-2xl border border-border bg-white p-5"
      aria-labelledby="purchase-summary-title"
    >
      <h2 id="purchase-summary-title" className="text-lg font-semibold text-brand-dark">
        Resumo
      </h2>

      {selectedTickets.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Selecione ao menos um ingresso disponível para continuar.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {selectedTickets.map((ticket) => (
              <li key={ticket.id} className="flex items-center justify-between gap-4">
                <span>
                  #{ticket.id} · {ticket.location}
                </span>
                <span className="font-medium text-brand-dark">{formatCurrency(ticket.price)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-medium text-brand-dark">Total</span>
            <span className="text-lg font-bold text-primary">{formatCurrency(total)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Reservas expiram em 5 minutos. A compra exige ingressos com status disponível.
          </p>
        </div>
      )}
    </aside>
  )
}
