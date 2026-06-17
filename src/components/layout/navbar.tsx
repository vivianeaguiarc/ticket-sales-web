import Link from "next/link"
import { Ticket } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/events", label: "Eventos" },
  { href: "/login", label: "Entrar" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Ticket className="size-4" />
            </span>
            <span>Ticket Sales</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="sm:hidden" render={<Link href="/events" />}>
              Eventos
            </Button>
            <Button variant="outline" size="sm" render={<Link href="/register/cliente" />}>
              Cadastrar
            </Button>
            <Button size="sm" render={<Link href="/login" />}>
              Entrar
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
