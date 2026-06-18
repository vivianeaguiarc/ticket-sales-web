'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PurchaseSummary } from '@/features/customer/components/purchase-summary'
import { TicketSelector } from '@/features/customer/components/ticket-selector'
import { EventsEmptyState } from '@/features/events/components/events-empty-state'
import { EventsErrorState } from '@/features/events/components/events-error-state'
import { useEventTickets } from '@/features/events/hooks/use-event-tickets'
import type { Event } from '@/features/events/types/event-types'
import { useCreatePurchase } from '@/features/purchases/hooks/use-create-purchase'
import {
  purchaseFormSchema,
  type PurchaseFormValues
} from '@/features/purchases/validations/purchase-schemas'
import { useCreateReservation } from '@/features/reservations/hooks/use-create-reservation'
import { getTicketOperationErrorMessage } from '@/lib/api/api-error'

type TicketPurchaseFlowProps = {
  event: Event
}

export function TicketPurchaseFlow({ event }: TicketPurchaseFlowProps) {
  const [selectedTicketIds, setSelectedTicketIds] = useState<number[]>([])
  const { tickets, isLoading, isError, errorMessage, refetch } = useEventTickets(event.id)
  const createReservation = useCreateReservation()
  const createPurchase = useCreatePurchase()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: { card_token: '' }
  })

  const selectedTickets = useMemo(
    () => tickets.filter((ticket) => selectedTicketIds.includes(ticket.id)),
    [selectedTicketIds, tickets]
  )

  const toggleTicket = (ticketId: number, checked: boolean) => {
    setSelectedTicketIds((current) =>
      checked ? [...current, ticketId] : current.filter((id) => id !== ticketId)
    )
  }

  const handleReserve = async () => {
    if (selectedTicketIds.length === 0) {
      toast.error('Selecione ao menos um ingresso disponível.')
      return
    }

    try {
      await createReservation.mutateAsync({
        eventId: event.id,
        ticket_ids: selectedTicketIds
      })

      toast.success('Ingressos reservados com sucesso por 5 minutos.')
      setSelectedTicketIds([])
    } catch (error) {
      toast.error(getTicketOperationErrorMessage(error))
    }
  }

  const handlePurchase = handleSubmit(async ({ card_token }) => {
    if (selectedTicketIds.length === 0) {
      toast.error('Selecione ao menos um ingresso disponível.')
      return
    }

    try {
      const purchase = await createPurchase.mutateAsync({
        eventId: event.id,
        ticket_ids: selectedTicketIds,
        card_token
      })

      toast.success(`Compra realizada com sucesso. Pedido #${purchase.id}.`)
      setSelectedTicketIds([])
    } catch (error) {
      toast.error(getTicketOperationErrorMessage(error))
    }
  })

  if (isLoading) {
    return (
      <Card className="border-border bg-white">
        <CardContent className="py-12">
          <LoadingSpinner label="Carregando ingressos..." />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return <EventsErrorState message={errorMessage ?? undefined} onRetry={() => refetch()} />
  }

  if (tickets.length === 0) {
    return (
      <EventsEmptyState
        title="Ingressos indisponíveis"
        description="Este evento ainda não possui ingressos cadastrados."
      />
    )
  }

  const isSubmitting = createReservation.isPending || createPurchase.isPending

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <Card className="border-border bg-white">
        <CardHeader>
          <CardTitle className="text-brand-dark">Selecione os ingressos</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketSelector
            tickets={tickets}
            selectedTicketIds={selectedTicketIds}
            onToggle={toggleTicket}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <PurchaseSummary selectedTickets={selectedTickets} />

        <Card className="border-border bg-white">
          <CardHeader>
            <CardTitle className="text-base text-brand-dark">Pagamento simulado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card_token">Token do cartão</Label>
              <Input
                id="card_token"
                placeholder="card_token_exemplo"
                autoComplete="off"
                aria-invalid={Boolean(errors.card_token)}
                {...register('card_token')}
              />
              {errors.card_token ? (
                <p className="text-sm text-destructive">{errors.card_token.message}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Campo exigido pela API para simular o pagamento. Não armazenamos este dado.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting || selectedTicketIds.length === 0}
                onClick={handleReserve}
              >
                {createReservation.isPending ? 'Reservando...' : 'Reservar ingressos'}
              </Button>
              <Button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting || selectedTicketIds.length === 0}
                onClick={handlePurchase}
              >
                {createPurchase.isPending ? 'Comprando...' : 'Comprar ingressos'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button variant="ghost" className="w-full" render={<Link href={`/events/${event.id}`} />}>
          Voltar para detalhes do evento
        </Button>
      </div>
    </div>
  )
}
