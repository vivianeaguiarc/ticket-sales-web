import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function CustomerDashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-brand-dark">Meu painel</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Acompanhe suas reservas e compras de ingressos em um só lugar.
        </p>
      </div>
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        render={<Link href="/events" />}
      >
        Explorar eventos
      </Button>
    </div>
  )
}
