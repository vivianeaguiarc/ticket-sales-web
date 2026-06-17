import type { JwtPayload } from '@/features/auth/types/auth.types'

export function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')

    if (!payload) {
      return null
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = atob(normalized)

    return JSON.parse(decoded) as JwtPayload
  } catch {
    return null
  }
}
