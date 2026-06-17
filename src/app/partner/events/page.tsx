'use client'

import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/feedback/loading-spinner'
import { Container } from '@/components/layout/container'
import { ProtectedRoute } from '@/features/auth/components/protected-route'

function PartnerEventsContent() {
  return (
    <section className="bg-brand-cream py-12">
      <Container>
        <h1 className="text-3xl font-bold text-brand-dark">Gerenciar eventos</h1>
        <p className="mt-2 text-muted-foreground">
          Listagem de eventos do parceiro será implementada na próxima etapa.
        </p>
      </Container>
    </section>
  )
}

export default function PartnerEventsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <ProtectedRoute allowedRole="partner">
        <PartnerEventsContent />
      </ProtectedRoute>
    </Suspense>
  )
}
