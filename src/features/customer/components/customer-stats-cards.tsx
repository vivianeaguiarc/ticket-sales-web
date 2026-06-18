import type { LucideIcon } from 'lucide-react'
import { Ban, ShoppingBag, Ticket, Timer } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CustomerDashboardStats } from '@/features/customer/types/customer-dashboard-types'
import { cn } from '@/lib/utils'

type StatCardProps = {
  title: string
  value: number
  description: string
  icon: LucideIcon
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="border-border bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-primary">
          <Icon className="size-4" aria-hidden />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-brand-dark">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

type CustomerStatsCardsProps = {
  stats: CustomerDashboardStats
  className?: string
}

export function CustomerStatsCards({ stats, className }: CustomerStatsCardsProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      <StatCard
        title="Total de compras"
        value={stats.totalPurchases}
        description="Compras registradas nesta sessão"
        icon={ShoppingBag}
      />
      <StatCard
        title="Reservas ativas"
        value={stats.activeReservations}
        description="Ingressos reservados e ainda válidos"
        icon={Timer}
      />
      <StatCard
        title="Reservas encerradas"
        value={stats.inactiveReservations}
        description="Expiradas ou canceladas"
        icon={Ban}
      />
      <StatCard
        title="Tickets adquiridos"
        value={stats.acquiredTickets}
        description="Ingressos em compras não canceladas"
        icon={Ticket}
      />
    </div>
  )
}
