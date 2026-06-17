import { Ticket, UserPlus } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Início', active: true },
  { href: '/events', label: 'Eventos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre nós' },
  { href: '#contato', label: 'Contato' }
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark text-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Ticket className="size-4" />
            </span>
            <span>TicketSales</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative py-5 text-white/80 transition-colors hover:text-white',
                  link.active &&
                    'text-white after:absolute after:bottom-3 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
            >
              Entrar
            </Link>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              render={<Link href="/register/cliente" />}
            >
              <UserPlus className="size-4" />
              Criar conta
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
