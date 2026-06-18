Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, TanStack Query, Axios, UX, acessibilidade, segurança frontend, consumo de APIs REST e arquitetura frontend escalável.

Assuma o projeto Ticket Sales Web no estado atual.

Contexto:
O frontend consome a API Ticket Sales:

Swagger:
https://ticket-sales-3su2.onrender.com/docs/

O projeto já possui:

- layout base
- paleta visual sem tons de azul
- qualidade de código configurada
- Axios client
- Auth flow com JWT
- validações com Zod
- preocupação com segurança e LGPD

Objetivo:
Implementar a área pública de eventos consumindo a API real.

━━━━━━━━━━━━━━━━━━━━━━━
FASE 1 — AUDITORIA DO BACKEND
━━━━━━━━━━━━━━━━━━━━━━━

Consultar o Swagger e identificar os endpoints públicos relacionados a eventos, principalmente:

- GET /events
- detalhes de evento, se existir
- listagem de tickets por evento, se existir rota pública ou protegida

Mapear:

- formato da resposta
- campos disponíveis
- status HTTP
- mensagens de erro

━━━━━━━━━━━━━━━━━━━━━━━
FASE 2 — TYPES
━━━━━━━━━━━━━━━━━━━━━━━

Criar types em:

src/features/events/types/event-types.ts

Tipos:

- Event
- EventListResponse, se necessário
- EventDetails
- Ticket
- TicketStatus

Garantir tipagem forte baseada no contrato da API.

━━━━━━━━━━━━━━━━━━━━━━━
FASE 3 — SERVICE
━━━━━━━━━━━━━━━━━━━━━━━

Criar:

src/features/events/services/event-service.ts

Com métodos:

- getEvents()
- getEventById(id)
- getEventTickets(eventId), se a API permitir

Usar o Axios client existente.

Não duplicar lógica do client.

━━━━━━━━━━━━━━━━━━━━━━━
FASE 4 — QUERIES
━━━━━━━━━━━━━━━━━━━━━━━

Criar hooks com TanStack Query:

src/features/events/hooks/use-events.ts
src/features/events/hooks/use-event-details.ts
src/features/events/hooks/use-event-tickets.ts, se necessário

Configurar:

- queryKey consistente
- staleTime adequado
- loading state
- error state
- refetch controlado

━━━━━━━━━━━━━━━━━━━━━━━
FASE 5 — PÁGINA DE LISTAGEM
━━━━━━━━━━━━━━━━━━━━━━━

Criar:

src/app/events/page.tsx

Funcionalidades:

- listar eventos reais da API
- exibir cards de eventos
- exibir loading skeleton
- exibir empty state
- exibir error state
- link para detalhes do evento

Card deve mostrar:

- nome
- descrição resumida
- data
- local
- call to action "Ver detalhes"

Aplicar UX:

- responsivo
- visual coerente com identidade vinho/burgundy
- sem tons de azul
- acessível
- texto legível

━━━━━━━━━━━━━━━━━━━━━━━
FASE 6 — PÁGINA DE DETALHES
━━━━━━━━━━━━━━━━━━━━━━━

Criar:

src/app/events/[id]/page.tsx

Funcionalidades:

- buscar detalhes do evento pelo id
- mostrar informações completas
- mostrar tickets disponíveis, se endpoint existir
- CTA para reservar/comprar
- se usuário não estiver autenticado, orientar login/cadastro
- se ticket não estiver disponível, exibir estado correto

━━━━━━━━━━━━━━━━━━━━━━━
FASE 7 — COMPONENTES
━━━━━━━━━━━━━━━━━━━━━━━

Criar ou ajustar:

- EventCard
- EventDetailsHeader
- EventTicketsList
- TicketStatusBadge
- EventSearchBar, se fizer sentido
- EventFilters, se fizer sentido

Filtros opcionais:

- busca por nome
- local
- data

Não implementar filtro se o backend não suportar e isso gerar complexidade desnecessária. Pode filtrar client-side se a lista for pequena.

━━━━━━━━━━━━━━━━━━━━━━━
FASE 8 — SEGURANÇA E LGPD
━━━━━━━━━━━━━━━━━━━━━━━

Aplicar:

- não expor dados sensíveis
- não armazenar informações de eventos em storage
- não logar respostas completas no console
- tratar erros de API sem mostrar stack trace
- validar id de rota antes da chamada, evitando request inválida
- manter mensagens amigáveis

━━━━━━━━━━━━━━━━━━━━━━━
FASE 9 — TESTES/VALIDAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━

Garantir:

- pnpm lint
- pnpm format:check
- pnpm typecheck
- pnpm build

Se houver testes configurados:

- testar event-service
- testar hooks com mocks
- testar renderização de EventCard

━━━━━━━━━━━━━━━━━━━━━━━
ENTREGA FINAL
━━━━━━━━━━━━━━━━━━━━━━━

Ao finalizar, entregar:

# O QUE FOI FEITO

# TELAS CRIADAS

# COMPONENTES CRIADOS

# CONCEITOS APLICADOS

Explicar:

- consumo de API real
- TanStack Query
- estados assíncronos
- loading/error/empty states
- tipagem TypeScript
- UX acessível
- segurança no tratamento de erros

# COMO VALIDAR

# PRÓXIMA TAREFA

# MENSAGEM DE COMMIT

Sugestão:
feat(events): implement public events pages
