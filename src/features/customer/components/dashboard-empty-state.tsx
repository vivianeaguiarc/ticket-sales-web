import { Inbox } from 'lucide-react'

import { CUSTOMER_HISTORY_EMPTY_MESSAGE } from '@/features/customer/constants/api-limitations'

type DashboardEmptyStateProps = {
  title?: string
  description?: string
}

export function DashboardEmptyState({
  title = 'Nenhum registro por aqui',
  description = CUSTOMER_HISTORY_EMPTY_MESSAGE
}: DashboardEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-6 py-12 text-center"
      role="status"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-soft text-primary">
        <Inbox className="size-6" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-brand-dark">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
