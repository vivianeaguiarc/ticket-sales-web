Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, TanStack Query, Axios, React Hook Form, Zod, segurança frontend, UX e integração com APIs REST.

Assuma o projeto Ticket Sales Web no estado atual.

Objetivo:
Implementar o fluxo do cliente para reserva e compra de tickets.

Contexto:
A API está documentada em:
https://ticket-sales-3su2.onrender.com/docs/

O frontend já possui:

- layout base
- autenticação JWT
- Axios client com interceptor
- TanStack Query
- listagem pública de eventos
- página de detalhes do evento

Tarefas:

1. Auditar no Swagger os endpoints:

- POST /partners/events/reservations
- POST /partners/events/purchases
- rota de listagem de tickets por evento, se existir

2. Criar services:

- reservation-service.ts
- purchase-service.ts

3. Criar hooks:

- useCreateReservation
- useCreatePurchase

4. Criar página:

- /customer/purchase/[eventId]

Ou integrar o fluxo diretamente em:

- /events/[id]

Escolha a abordagem mais simples e consistente com o projeto atual.

5. Implementar:

- listagem de tickets disponíveis
- seleção de tickets available
- resumo da compra
- botão Reservar
- botão Comprar
- feedback de sucesso/erro
- estados loading/error/empty
- redirecionamento para login se não autenticado

6. Segurança/LGPD:

- não armazenar dados sensíveis
- não logar token ou dados pessoais
- tratar erros sem expor stack trace
- validar eventId antes das requisições
- bloquear compra se não houver ticket selecionado

7. Atualizar a home:

- substituir eventos mockados por eventos reais da API
- manter fallback visual se não houver eventos

8. Garantir:

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
feat(customer): implement ticket reservation and purchase flow
