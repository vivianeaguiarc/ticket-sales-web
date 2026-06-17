import { Container } from '@/components/layout/container'

export default function TermsPage() {
  return (
    <section className="bg-brand-cream py-12">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-brand-dark">Termos de Uso</h1>
        <p className="mt-4 text-muted-foreground">
          Este documento é um placeholder para o projeto de portfólio TicketSales. Em uma versão de
          produção, os termos legais completos devem ser revisados por assessoria jurídica antes da
          publicação.
        </p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Ao utilizar a plataforma, o usuário concorda em fornecer informações verdadeiras e
            utilizar o serviço de forma lícita, respeitando as regras de compra, reserva e
            cancelamento de ingressos.
          </p>
          <p>
            A plataforma atua como intermediadora tecnológica entre organizadores de eventos e
            compradores, não se responsabilizando por alterações de programação realizadas pelos
            parceiros.
          </p>
        </div>
      </Container>
    </section>
  )
}
