import Link from 'next/link'

import { Container } from '@/components/layout/container'

const footerLinks = [
  { href: 'https://ticket-sales-3su2.onrender.com/docs/', label: 'API Docs' },
  { href: 'https://github.com/vivianeaguiarc/ticket-sales', label: 'Backend' }
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Ticket Sales</p>
          <p className="text-sm text-muted-foreground">
            Plataforma de venda de ingressos — projeto de portfólio.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <span>© {year}</span>
        </div>
      </Container>
    </footer>
  )
}
