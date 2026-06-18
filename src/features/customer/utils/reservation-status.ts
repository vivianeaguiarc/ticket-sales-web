import type {
  CustomerReservation,
  ReservationDisplayStatus
} from '@/features/customer/types/customer-dashboard-types'

export function getReservationDisplayStatus(
  reservation: CustomerReservation,
  now = Date.now()
): ReservationDisplayStatus {
  if (reservation.status === 'cancelled') {
    return 'cancelled'
  }

  const expiresAt = new Date(reservation.expires_at).getTime()

  if (!Number.isNaN(expiresAt) && expiresAt <= now) {
    return 'expired'
  }

  return 'reserved'
}

export function isActiveReservation(reservation: CustomerReservation, now = Date.now()): boolean {
  return getReservationDisplayStatus(reservation, now) === 'reserved'
}
