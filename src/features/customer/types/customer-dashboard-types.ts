import type { TicketStatus } from '@/features/events/types/event-types'
import type { PurchaseStatus } from '@/features/purchases/types/purchase-types'

export type ReservationDisplayStatus = 'reserved' | 'cancelled' | 'expired'

export type DashboardStatus =
  | PurchaseStatus
  | ReservationDisplayStatus
  | TicketStatus
  | 'pending'
  | 'error'

export interface CustomerEventSummary {
  id: number
  name: string
  date: string
  location: string
}

export interface CustomerPurchaseTicket {
  id: number
  location: string
  price: number
  status: TicketStatus
  event: CustomerEventSummary
}

export interface CustomerPurchase {
  id: number
  status: PurchaseStatus
  total_amount: number
  purchase_date: string
  tickets: CustomerPurchaseTicket[]
}

export interface CustomerReservationTicket {
  id: number
  location: string
  price: number
  status: TicketStatus
  event: CustomerEventSummary
}

export interface CustomerReservation {
  id: number
  status: 'reserved' | 'cancelled'
  reservation_date: string
  expires_at: string
  ticket: CustomerReservationTicket
}

export interface CustomerDashboardStats {
  totalPurchases: number
  activeReservations: number
  inactiveReservations: number
  acquiredTickets: number
}
