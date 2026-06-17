import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { PublicOnlyRoute } from '@/features/auth/components/public-only-route'
import { RegisterPartnerForm } from '@/features/auth/components/register-partner-form'

export default function RegisterPartnerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <PublicOnlyRoute>
        <RegisterPartnerForm />
      </PublicOnlyRoute>
    </Suspense>
  )
}
