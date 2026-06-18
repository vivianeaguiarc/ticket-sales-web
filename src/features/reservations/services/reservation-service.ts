import type {
  CreateReservationRequest,
  CreateReservationResponse
} from '@/features/reservations/types/reservation-types'
import { apiClient } from '@/lib/api/client'
import { endpoints } from '@/lib/api/endpoints'

export const reservationService = {
  async createReservation(data: CreateReservationRequest): Promise<CreateReservationResponse> {
    const response = await apiClient.post<CreateReservationResponse>(
      endpoints.partners.reservations,
      data
    )

    return response.data
  }
}
