'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { useAuth } from '@/features/auth/hooks/use-auth'
import {
  canAccessPath,
  getDashboardPath,
  sanitizeRedirectPath
} from '@/features/auth/utils/route-utils'

type ProtectedRouteProps = {
  children: React.ReactNode
  allowedRole?: 'customer' | 'partner'
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isAuthenticated || !user) {
      const redirect = sanitizeRedirectPath(pathname, '/login')
      const query = redirect === '/login' ? '' : `?redirect=${encodeURIComponent(redirect)}`
      router.replace(`/login${query}`)
      return
    }

    if (allowedRole && user.role !== allowedRole) {
      router.replace(getDashboardPath(user.role))
      return
    }

    if (!canAccessPath(user.role, pathname)) {
      router.replace(getDashboardPath(user.role))
    }
  }, [allowedRole, isAuthenticated, isLoading, pathname, router, user])

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (allowedRole && user.role !== allowedRole) {
    return null
  }

  if (!canAccessPath(user.role, pathname)) {
    return null
  }

  return <>{children}</>
}
