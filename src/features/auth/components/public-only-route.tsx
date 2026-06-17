'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { getDashboardPath, sanitizeRedirectPath } from '@/features/auth/utils/route-utils'

type PublicOnlyRouteProps = {
  children: React.ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) {
      return
    }

    const redirectParam = searchParams.get('redirect')
    const destination = sanitizeRedirectPath(redirectParam, getDashboardPath(user.role))

    router.replace(destination)
  }, [isAuthenticated, isLoading, router, searchParams, user])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}
