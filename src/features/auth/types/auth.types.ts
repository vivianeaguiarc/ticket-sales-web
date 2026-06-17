export type AuthRole = 'customer' | 'partner'

export interface AuthUser {
  userId: number
  email: string
  role: AuthRole
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterCustomerRequest {
  name: string
  email: string
  password: string
  address: string
  phone: string
}

export interface RegisterPartnerRequest {
  name: string
  email: string
  password: string
  company_name: string
}

export interface RegisterCustomerResponse {
  id: number
  userId: number
  name: string
  address: string
  phone: string
  createdAt: string
}

export interface RegisterPartnerResponse {
  id: number
  name: string
  userId: number
  company_name: string
  createdAt: string
}

export interface JwtPayload {
  id: number
  email: string
  iat?: number
  exp?: number
}
