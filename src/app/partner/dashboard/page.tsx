'use client'

import Link from 'next/link'
import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { useAuth } from '@/features/auth/hooks/use-auth'

function PartnerDashboardContent() {
  const { user } = useAuth()

  return (
    <section className="bg-brand-cream py-12">
      <Container>
        <h1 className="text-3xl font-bold text-brand-dark">Dashboard do Parceiro</h1>
        <p className="mt-2 text-muted-foreground">
          Bem-vindo, {user?.email}. Gerencie seus eventos e acompanhe vendas.
        </p>
        <div className="mt-6 flex gap-3">
          <Button render={<Link href="/partner/events" />}>Gerenciar eventos</Button>
          <Button variant="outline" render={<Link href="/partner/events/new" />}>
            Criar evento
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default function PartnerDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <ProtectedRoute allowedRole="partner">
        <PartnerDashboardContent />
      </ProtectedRoute>
    </Suspense>
  )
}
