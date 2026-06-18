import type { DashboardStatus } from '@/features/customer/types/customer-dashboard-types'
import { cn } from '@/lib/utils'

const statusConfig: Record<
  DashboardStatus,
  {
    label: string
    className: string
  }
> = {
  reserved: {
    label: 'Reservado',
    className: 'bg-brand-soft text-primary'
  },
  expired: {
    label: 'Expirado',
    className: 'bg-amber-100 text-amber-800'
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-muted text-muted-foreground'
  },
  paid: {
    label: 'Pago',
    className: 'bg-brand-soft text-primary'
  },
  pending: {
    label: 'Pendente',
    className: 'bg-amber-100 text-amber-800'
  },
  error: {
    label: 'Erro',
    className: 'bg-destructive/10 text-destructive'
  },
  sold: {
    label: 'Vendido',
    className: 'bg-muted text-muted-foreground'
  },
  available: {
    label: 'Disponível',
    className: 'bg-emerald-100 text-emerald-800'
  }
}

type StatusBadgeProps = {
  status: DashboardStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
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
