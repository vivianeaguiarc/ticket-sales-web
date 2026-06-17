import type { AuthUser } from '@/features/auth/types/auth.types'

const ACCESS_TOKEN_KEY = 'ts_access_token'
const AUTH_USER_KEY = 'ts_auth_user'
const SESSION_COOKIE = 'ts_session'

const isBrowser = () => typeof window !== 'undefined'

function setSessionCookie(): void {
  if (!isBrowser()) {
    return
  }

  const maxAge = 60 * 60
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${maxAge}; SameSite=Lax`
}

function removeSessionCookie(): void {
  if (!isBrowser()) {
    return
  }

  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`
}

export function getAccessToken(): string | null {
  if (!isBrowser()) {
    return null
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  if (!isBrowser()) {
    return
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, token)
  setSessionCookie()
}

export function removeAccessToken(): void {
  if (!isBrowser()) {
    return
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  removeSessionCookie()
}

export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) {
    return null
  }

  const raw = localStorage.getItem(AUTH_USER_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setStoredUser(user: AuthUser): void {
  if (!isBrowser()) {
    return
  }

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken() && getStoredUser())
}
