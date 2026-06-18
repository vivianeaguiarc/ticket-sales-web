export interface CreateReservationRequest {
  ticket_ids: number[]
}

export interface Reservation {
  id: number
  customer_id: number
  ticket_id: number
  reservation_date: string
  expires_at: string
  status: 'reserved' | 'cancelled'
}

export type CreateReservationResponse = Reservation[]
