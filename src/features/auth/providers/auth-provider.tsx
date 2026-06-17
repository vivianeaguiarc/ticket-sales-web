'use client'

import { useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'

import { authService } from '@/features/auth/services/auth-service'
import {
  getAccessToken,
  getStoredUser,
  isAuthenticated as checkAuthenticated
} from '@/features/auth/storage/auth-storage'
import type { AuthUser, LoginRequest } from '@/features/auth/types/auth.types'
import { getDashboardPath } from '@/features/auth/utils/route-utils'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<AuthUser>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function subscribeAuth(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener('auth:unauthorized', onStoreChange)

  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener('auth:unauthorized', onStoreChange)
  }
}

function getAuthSnapshot(): AuthUser | null {
  return checkAuthenticated() ? getStoredUser() : null
}

function subscribeMounted(onStoreChange: () => void) {
  onStoreChange()

  return () => undefined
}

function getMountedSnapshot(): boolean {
  return true
}

function getServerMountedSnapshot(): boolean {
  return false
}

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const user = useSyncExternalStore(subscribeAuth, getAuthSnapshot, () => null)
  const isMounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot
  )

  const login = useCallback(async (data: LoginRequest) => {
    const authenticatedUser = await authService.login(data)
    window.dispatchEvent(new Event('storage'))

    return authenticatedUser
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    window.dispatchEvent(new Event('storage'))
    router.replace('/login')
  }, [router])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user && getAccessToken()),
      isLoading: !isMounted,
      login,
      logout
    }),
    [user, isMounted, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}

export { getDashboardPath }
