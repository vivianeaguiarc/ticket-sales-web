'use client'

import { LogOut, Ticket, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { getDashboardPath } from '@/features/auth/utils/route-utils'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/events', label: 'Eventos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre nós' },
  { href: '#contato', label: 'Contato' }
]

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, logout } = useAuth()

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
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : link.href.startsWith('/')
                    ? pathname === link.href || pathname.startsWith(`${link.href}/`)
                    : false

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative py-5 text-white/80 transition-colors hover:text-white',
                    isActive &&
                      'text-white after:absolute after:bottom-3 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            {!isLoading && isAuthenticated && user ? (
              <>
                <Link
                  href={getDashboardPath(user.role)}
                  className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
                >
                  Minha conta
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
                >
                  Entrar
                </Link>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  render={<Link href="/register/customer" />}
                >
                  <UserPlus className="size-4" />
                  Criar conta
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
