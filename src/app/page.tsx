import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Headphones,
  MapPin,
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
import { cn } from '@/lib/utils'

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

const featuredEvents = [
  {
    id: 1,
    title: 'Festival Sunset Vibes',
    category: 'Festival',
    categoryClass: 'bg-emerald-100 text-emerald-700',
    date: '15 Ago 2026 · 18:00',
    location: 'Praia de Copacabana, RJ',
    price: '120,00',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf529298ce?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Stand Up Comedy Night',
    category: 'Stand Up',
    categoryClass: 'bg-amber-100 text-amber-700',
    date: '22 Ago 2026 · 20:30',
    location: 'Teatro Municipal, SP',
    price: '85,00',
    image:
      'https://images.unsplash.com/photo-1585699323591-3711e3b9fc87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Rock in Rio Experience',
    category: 'Show',
    categoryClass: 'bg-brand-soft text-primary',
    date: '05 Set 2026 · 16:00',
    location: 'Parque Olímpico, RJ',
    price: '350,00',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Orquestra Sinfônica',
    category: 'Show',
    categoryClass: 'bg-brand-soft text-primary',
    date: '12 Set 2026 · 19:00',
    location: 'Sala São Paulo, SP',
    price: '200,00',
    image:
      'https://images.unsplash.com/photo-1465847899284-01109834b63f?auto=format&fit=crop&w=800&q=80'
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
                  render={<Link href="/register/parceiro" />}
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

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-5 text-primary" />
              <h2 className="text-2xl font-bold text-brand-dark">Eventos em destaque</h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Ver todos os eventos
              <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </Container>
      </section>

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
              render={<Link href="/register/parceiro" />}
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

type EventCardProps = {
  title: string
  category: string
  categoryClass: string
  date: string
  location: string
  price: string
  image: string
}

function EventCard({
  title,
  category,
  categoryClass,
  date,
  location,
  price,
  image
}: EventCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </div>

      <div className="p-4">
        <span
          className={cn('inline-flex rounded-md px-2 py-0.5 text-xs font-semibold', categoryClass)}
        >
          {category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-base font-bold text-brand-dark">{title}</h3>

        <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock3 className="size-3.5 shrink-0" />
            {date}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0" />
            {location}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm">
            <span className="text-muted-foreground">A partir de </span>
            <span className="font-bold text-primary">R$ {price}</span>
          </p>
          <Link
            href="/events"
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label={`Ver detalhes de ${title}`}
          >
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
