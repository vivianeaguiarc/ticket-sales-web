'use client'

import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { CustomerDashboardContent } from '@/features/customer/components/customer-dashboard-content'

export function CustomerDashboardPageContent() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <ProtectedRoute allowedRole="customer">
        <CustomerDashboardContent />
      </ProtectedRoute>
    </Suspense>
  )
}
