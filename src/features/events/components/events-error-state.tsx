import { AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

type EventsErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function EventsErrorState({
  message = 'Não foi possível carregar os eventos. Tente novamente em instantes.',
  onRetry
}: EventsErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-white px-6 py-16 text-center"
      role="alert"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" aria-hidden />
      </div>
      <h2 className="text-lg font-semibold text-brand-dark">Algo deu errado</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button className="mt-6" variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      ) : null}
    </div>
  )
}
