import type { AuthRole } from '@/features/auth/types/auth.types'
import { apiClient } from '@/lib/api/client'
import { endpoints } from '@/lib/api/endpoints'

export async function detectUserRole(): Promise<AuthRole> {
  try {
    await apiClient.get(endpoints.partners.events)
    return 'partner'
  } catch {
    return 'customer'
  }
}
