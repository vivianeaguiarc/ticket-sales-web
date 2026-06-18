export type TicketStatus = 'available' | 'reserved' | 'sold'

export interface Event {
  id: number
  partner_id: number
  name: string
  description: string | null
  date: string
  location: string
  created_at: string
}

export type EventDetails = Event

export type EventListResponse = Event[]

export interface Ticket {
  id: number
  event_id: number
  location: string
  price: number
  status: TicketStatus
  created_at: string
}

export type EventTicketsResponse = Ticket[]
