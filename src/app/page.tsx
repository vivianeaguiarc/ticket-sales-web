import {
  ArrowRight,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Ticket,
  UserRound,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { FeaturedEventsSection } from '@/features/events/components/featured-events-section'

const features = [
  {
    icon: ShieldCheck,
    title: 'Compra segura',
    description: 'Pagamento protegido e confirmação imediata do ingresso.'
  },
  {
    icon: Zap,
    title: 'Reserva rápida',
    description: 'Garanta seu lugar em poucos cliques, sem burocracia.'
  },
  {
    icon: RefreshCw,
    title: 'Cancelamento fácil',
    description: 'Política transparente para desistências dentro do prazo.'
  },
  {
    icon: Headphones,
    title: 'Suporte dedicado',
    description: 'Equipe pronta para ajudar antes, durante e após o evento.'
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-brand-cream pb-24 pt-12 sm:pb-28 sm:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Plataforma de venda de ingressos
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Os melhores eventos.
                <br />
                As melhores <span className="text-primary">experiências.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Encontre shows, festivais e experiências únicas. Compre ou reserve ingressos com
                praticidade e segurança.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  render={<Link href="/events" />}
                >
                  Ver eventos
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-dark/20 bg-white text-brand-dark hover:bg-white/80"
                  render={<Link href="/register/partner" />}
                >
                  <UserRound className="size-4" />
                  Sou parceiro / organizador
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-brand-dark/10">
                <Image
                  src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
                  alt="Público em show com iluminação de palco"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-2xl bg-primary/20 lg:block" />
            </div>
          </div>
        </Container>
      </section>

      <section id="como-funciona" className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
        <Container className="rounded-2xl border border-border bg-white p-6 shadow-lg shadow-brand-dark/5 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      <FeaturedEventsSection />

      <section id="sobre" className="bg-brand-cream py-12 sm:py-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-maroon px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10 sm:py-10">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Ticket className="size-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">É organizador de eventos?</h2>
                <p className="mt-1 max-w-md text-sm text-white/80 sm:text-base">
                  Cadastre-se como parceiro e comece a vender ingressos na plataforma.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              render={<Link href="/register/partner" />}
            >
              Quero ser parceiro
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}

type FeatureItemProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <h3 className="font-semibold text-brand-dark">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
