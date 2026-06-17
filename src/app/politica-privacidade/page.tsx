import { Container } from '@/components/layout/container'

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-brand-cream py-12">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-brand-dark">Política de Privacidade</h1>
        <p className="mt-4 text-muted-foreground">
          Este documento descreve, em nível de portfólio, como o frontend TicketSales trata dados
          pessoais em conformidade com princípios da LGPD.
        </p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Coletamos apenas os dados necessários para cadastro, autenticação e operação da
            plataforma: nome, e-mail, senha (armazenada com hash no backend), endereço e telefone
            para clientes, e nome da empresa para parceiros.
          </p>
          <p>
            O frontend não persiste senha, telefone ou endereço no navegador após o cadastro. Apenas
            token de acesso e dados mínimos de sessão (e-mail e perfil) são mantidos localmente.
          </p>
          <p>
            O consentimento explícito é solicitado no momento do cadastro, com aceite dos Termos de
            Uso e desta Política de Privacidade.
          </p>
        </div>
      </Container>
    </section>
  )
}
