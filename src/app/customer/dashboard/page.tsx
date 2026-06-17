'use client'

import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { Container } from '@/components/layout/container'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { useAuth } from '@/features/auth/hooks/use-auth'

function CustomerDashboardContent() {
  const { user } = useAuth()

  return (
    <section className="bg-brand-cream py-12">
      <Container>
        <h1 className="text-3xl font-bold text-brand-dark">Dashboard do Cliente</h1>
        <p className="mt-2 text-muted-foreground">
          Bem-vindo, {user?.email}. Em breve você poderá gerenciar reservas e compras aqui.
        </p>
      </Container>
    </section>
  )
}

export default function CustomerDashboardPage() {
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
