import type { AuthRole } from '@/features/auth/types/auth.types'

const CUSTOMER_PREFIX = '/customer'
const PARTNER_PREFIX = '/partner'

const AUTH_PAGES = ['/login', '/register/customer', '/register/partner']

const DEFAULT_REDIRECTS: Record<AuthRole, string> = {
  customer: '/customer/dashboard',
  partner: '/partner/dashboard'
}

export function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

export function isProtectedPath(pathname: string): boolean {
  return pathname.startsWith(CUSTOMER_PREFIX) || pathname.startsWith(PARTNER_PREFIX)
}

export function getDashboardPath(role: AuthRole): string {
  return DEFAULT_REDIRECTS[role]
}

export function sanitizeRedirectPath(path: string | null | undefined, fallback: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return fallback
  }

  if (isAuthPage(path)) {
    return fallback
  }

  return path
}

export function canAccessPath(role: AuthRole, pathname: string): boolean {
  if (pathname.startsWith(CUSTOMER_PREFIX)) {
    return role === 'customer'
  }

  if (pathname.startsWith(PARTNER_PREFIX)) {
    return role === 'partner'
  }

  return true
}
