import type { PurchaseStatus } from '@/features/purchases/types/purchase-types'
import type { Reservation } from '@/features/reservations/types/reservation-types'

export type ReservationDisplayStatus = 'reserved' | 'cancelled' | 'expired'

export type DashboardStatus =
  | PurchaseStatus
  | ReservationDisplayStatus
  | 'sold'
  | 'available'
  | 'pending'
  | 'error'

export interface CustomerPurchaseTicket {
  id?: number
  ticket_id: number
  location?: string
  event_id?: number
  event_name?: string
}

export interface CustomerPurchase {
  id: number
  customer_id: number
  purchase_date: string
  total_amount: number
  status: PurchaseStatus
  tickets?: CustomerPurchaseTicket[]
}

export interface CustomerReservation extends Reservation {
  event_id?: number
  event_name?: string
  event_location?: string
  event_date?: string
  ticket_location?: string
  ticket_price?: number
}

export interface CustomerDashboardStats {
  totalPurchases: number
  activeReservations: number
  inactiveReservations: number
  acquiredTickets: number
}
