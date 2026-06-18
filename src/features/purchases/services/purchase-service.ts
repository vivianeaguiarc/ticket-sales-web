import type { CreatePurchaseRequest, Purchase } from '@/features/purchases/types/purchase-types'
import { apiClient } from '@/lib/api/client'
import { endpoints } from '@/lib/api/endpoints'

export const purchaseService = {
  async createPurchase(data: CreatePurchaseRequest): Promise<Purchase> {
    const response = await apiClient.post<Purchase>(endpoints.partners.purchases, data)

    return response.data
  }
}
