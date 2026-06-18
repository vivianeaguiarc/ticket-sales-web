Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, TanStack Query, Axios, UX, segurança frontend, LGPD, dashboards, autenticação JWT e integração com APIs REST.

Assuma o projeto Ticket Sales Web no estado atual.

Objetivo:
Implementar o Dashboard do Cliente com histórico de reservas e compras.

Contexto:
A API está documentada em:
https://ticket-sales-3su2.onrender.com/docs/

O frontend já possui:

- layout base
- autenticação JWT
- Axios client com interceptor
- listagem pública de eventos
- detalhes do evento
- fluxo de reserva e compra de tickets

Tarefas:

1. Auditar no Swagger quais endpoints existem para:

- listar compras do cliente
- listar reservas do cliente
- buscar detalhes de purchase
- cancelar purchase

2. Criar ou ajustar services:

- customer-service.ts
- reservation-service.ts
- purchase-service.ts

3. Criar hooks com TanStack Query:

- useCustomerPurchases
- useCustomerReservations
- useCancelPurchase

4. Criar página:

- /customer/dashboard

5. Criar layout do dashboard:

- resumo com cards:
  - total de compras
  - reservas ativas
  - compras canceladas
  - tickets adquiridos
- seção “Minhas reservas”
- seção “Minhas compras”

6. Para reservas:
   Exibir:

- evento
- ticket
- status
- data da reserva
- expiração, se disponível
- estado visual para reserved/cancelled/expired

7. Para compras:
   Exibir:

- id da compra
- status
- valor total
- data
- tickets vinculados, se disponível
- botão cancelar compra quando permitido

8. Segurança e LGPD:

- não armazenar dados pessoais em localStorage
- não expor token em logs
- não exibir dados sensíveis desnecessários
- tratar erro 401 redirecionando para login
- mensagens amigáveis sem detalhes técnicos

9. UX:

- loading skeleton
- empty states
- error states
- badges de status
- responsividade mobile-first
- visual coerente com paleta vinho/burgundy
- sem tons de azul

10. Garantir:

- pnpm lint
- pnpm format:check
- pnpm typecheck
- pnpm build

Ao finalizar, entregue:

# O QUE FOI FEITO

# TELAS CRIADAS

# COMPONENTES CRIADOS

# CONCEITOS APLICADOS

# COMO VALIDAR

# PRÓXIMA TAREFA

# MENSAGEM DE COMMIT

Sugestão:
feat(customer): add customer dashboard with purchases and reservations
