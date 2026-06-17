import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { AppProviders } from "@/providers/app-providers"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Ticket Sales",
    template: "%s | Ticket Sales",
  },
  description:
    "Plataforma web para descobrir eventos, reservar e comprar ingressos com a API Ticket Sales.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  )
}
