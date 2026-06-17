import {
  removeAccessToken,
  setAccessToken,
  setStoredUser
} from '@/features/auth/storage/auth-storage'
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterCustomerRequest,
  RegisterCustomerResponse,
  RegisterPartnerRequest,
  RegisterPartnerResponse
} from '@/features/auth/types/auth.types'
import { parseJwtPayload } from '@/features/auth/utils/parse-jwt'
import { detectUserRole } from '@/features/auth/utils/role-detector'
import { apiClient } from '@/lib/api/client'
import { endpoints } from '@/lib/api/endpoints'

async function persistSession(token: string, role: AuthUser['role']): Promise<AuthUser> {
  const payload = parseJwtPayload(token)

  if (!payload?.id || !payload.email) {
    removeAccessToken()
    throw new Error('Invalid session')
  }

  const user: AuthUser = {
    userId: payload.id,
    email: payload.email,
    role
  }

  setAccessToken(token)
  setStoredUser(user)

  return user
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthUser> {
    const { data: response } = await apiClient.post<LoginResponse>(endpoints.auth.login, data)

    setAccessToken(response.token)
    const role = await detectUserRole()

    return persistSession(response.token, role)
  },

  async registerCustomer(data: RegisterCustomerRequest): Promise<RegisterCustomerResponse> {
    const { data: response } = await apiClient.post<RegisterCustomerResponse>(
      endpoints.customers.register,
      data
    )

    return response
  },

  async registerPartner(data: RegisterPartnerRequest): Promise<RegisterPartnerResponse> {
    const { data: response } = await apiClient.post<RegisterPartnerResponse>(
      endpoints.partners.register,
      data
    )

    return response
  },

  logout(): void {
    removeAccessToken()
  }
}
