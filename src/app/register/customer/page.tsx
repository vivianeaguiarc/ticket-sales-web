import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { PublicOnlyRoute } from '@/features/auth/components/public-only-route'
import { RegisterCustomerForm } from '@/features/auth/components/register-customer-form'

export default function RegisterCustomerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <PublicOnlyRoute>
        <RegisterCustomerForm />
      </PublicOnlyRoute>
    </Suspense>
  )
}
