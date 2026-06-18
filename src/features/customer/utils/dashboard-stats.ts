import type {
  CustomerDashboardStats,
  CustomerPurchase,
  CustomerReservation
} from '@/features/customer/types/customer-dashboard-types'
import { isActiveReservation } from '@/features/customer/utils/reservation-status'

function countAcquiredTickets(purchases: CustomerPurchase[]): number {
  return purchases.reduce((total, purchase) => {
    if (purchase.status === 'cancelled') {
      return total
    }

    if (purchase.tickets?.length) {
      return total + purchase.tickets.length
    }

    return total + 1
  }, 0)
}

export function buildDashboardStats(
  purchases: CustomerPurchase[],
  reservations: CustomerReservation[]
): CustomerDashboardStats {
  return {
    totalPurchases: purchases.length,
    activeReservations: reservations.filter((reservation) => isActiveReservation(reservation))
      .length,
    inactiveReservations: reservations.filter((reservation) => !isActiveReservation(reservation))
      .length,
    acquiredTickets: countAcquiredTickets(purchases)
  }
}
