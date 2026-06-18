import type { Metadata } from 'next'

import { CustomerDashboardPageContent } from '@/features/customer/components/customer-dashboard-page-content'

export const metadata: Metadata = {
  title: 'Dashboard do Cliente'
}

export default function CustomerDashboardPage() {
  return <CustomerDashboardPageContent />
}
