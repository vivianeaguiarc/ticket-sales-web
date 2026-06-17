import { ArrowRight, CalendarDays, ShieldCheck, Ticket } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background py-20 sm:py-28">
        <Container className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Ticket className="size-3.5" />
            Conectado à API Ticket Sales
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Encontre eventos e compre ingressos com segurança
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Frontend profissional em Next.js consumindo a API REST de venda de ingressos — com
            autenticação JWT, reservas temporárias e fluxo completo de compra.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/events" />}>
              Explorar eventos
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/register/parceiro" />}>
              Sou parceiro
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={CalendarDays}
              title="Eventos públicos"
              description="Navegue por shows, festivais e experiências disponíveis na plataforma."
            />
            <FeatureCard
              icon={Ticket}
              title="Reserva e compra"
              description="Selecione ingressos, reserve por tempo limitado ou finalize a compra na hora."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="API robusta"
              description="Integração com backend transacional, JWT e controle de concorrência."
            />
          </div>
        </Container>
      </section>
    </div>
  )
}

type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  )
}
