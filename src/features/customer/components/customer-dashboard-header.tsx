import Link from 'next/link'

import { Button } from '@/components/ui/button'

type CustomerDashboardHeaderProps = {
  isSessionCache?: boolean
}

export function CustomerDashboardHeader({ isSessionCache = false }: CustomerDashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-brand-dark">Meu painel</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Acompanhe reservas e compras realizadas na sua sessão atual.
        </p>
        {isSessionCache ? (
          <p className="mt-2 text-xs text-muted-foreground">
            A API ainda não expõe listagem de histórico; os dados abaixo refletem ações feitas nesta
            sessão.
          </p>
        ) : null}
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
