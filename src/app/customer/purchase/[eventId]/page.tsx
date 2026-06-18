import type { Metadata } from 'next'

import { CustomerPurchasePageContent } from '@/features/customer/components/customer-purchase-page-content'

export const metadata: Metadata = {
  title: 'Reservar ou comprar ingressos'
}

type CustomerPurchasePageProps = {
  params: Promise<{ eventId: string }>
}

export default function CustomerPurchasePage({ params }: CustomerPurchasePageProps) {
  return <CustomerPurchasePageContent params={params} />
}
