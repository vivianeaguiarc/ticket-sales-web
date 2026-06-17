import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { LoginForm } from '@/features/auth/components/login-form'
import { PublicOnlyRoute } from '@/features/auth/components/public-only-route'

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <PublicOnlyRoute>
        <LoginForm />
      </PublicOnlyRoute>
    </Suspense>
  )
}
