import './globals.css'

import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { AppProviders } from '@/providers/app-providers'

const mulish = Mulish({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'TicketSales',
    template: '%s | TicketSales'
  },
  description:
    'Plataforma web para descobrir eventos, reservar e comprar ingressos com a API Ticket Sales.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${mulish.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  )
}
