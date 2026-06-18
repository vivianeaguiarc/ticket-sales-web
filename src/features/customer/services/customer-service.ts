import type {
  CustomerPurchase,
  CustomerReservation
} from '@/features/customer/types/customer-dashboard-types'
import { apiClient } from '@/lib/api/client'
import { endpoints } from '@/lib/api/endpoints'

export const customerService = {
  async getPurchases(): Promise<CustomerPurchase[]> {
    const response = await apiClient.get<CustomerPurchase[]>(endpoints.customers.purchases)

    return response.data
  },

  async getReservations(): Promise<CustomerReservation[]> {
    const response = await apiClient.get<CustomerReservation[]>(endpoints.customers.reservations)

    return response.data
  }
}
