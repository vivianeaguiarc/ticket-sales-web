Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, TanStack Query, Axios, UX, segurança frontend, LGPD, dashboards, autenticação JWT e arquitetura frontend escalável.

Assuma o projeto Ticket Sales Web no estado atual.

Objetivo:
Implementar o Dashboard do Cliente no frontend, com histórico visual de reservas e compras, usando apenas endpoints já disponíveis no backend.

Contexto:
Backend publicado:
https://ticket-sales-3su2.onrender.com

Swagger:
https://ticket-sales-3su2.onrender.com/docs/

Regras:

- Trabalhar somente no frontend.
- Não alterar backend.
- Não criar endpoints inexistentes.
- Usar apenas rotas disponíveis no Swagger.
- Caso algum dado não esteja disponível pela API, criar fallback visual elegante ou TODO documentado.
- Não usar dados sensíveis em localStorage.
- Não logar token ou dados pessoais.
- Tratar 401 redirecionando para login.

Tarefas:

1. Criar página:
   src/app/customer/dashboard/page.tsx

2. Criar componentes:

- CustomerDashboardHeader
- CustomerStatsCards
- CustomerReservationsList
- CustomerPurchasesList
- StatusBadge
- DashboardEmptyState
- DashboardLoadingState
- DashboardErrorState

3. Criar dados derivados no frontend:

- total de compras
- reservas ativas
- reservas expiradas/canceladas
- tickets adquiridos

4. Criar hooks:

- useCustomerDashboard
- useCustomerPurchases, se houver endpoint disponível
- useCustomerReservations, se houver endpoint disponível

5. Se a API ainda não disponibilizar listagem direta:

- deixar estrutura preparada
- usar fallback com mensagem:
  "Seu histórico aparecerá aqui quando houver dados disponíveis."
- não usar mocks como se fossem dados reais

6. UX:

- layout responsivo
- cards claros
- empty states elegantes
- loading skeleton
- badges para status:
  - reserved
  - paid
  - cancelled
  - expired
  - sold
- visual com paleta vinho/burgundy/off-white, sem tons de azul

7. Segurança/LGPD:

- exibir apenas dados necessários
- não persistir histórico em storage
- evitar expor informações pessoais
- tratar erro de sessão expirada
- mensagens amigáveis

8. Garantir:

- pnpm lint
- pnpm format:check
- pnpm typecheck
- pnpm build

Ao finalizar, entregar:

# O QUE FOI FEITO

# TELAS CRIADAS

# COMPONENTES CRIADOS

# CONCEITOS APLICADOS

# LIMITAÇÕES ATUAIS

# COMO VALIDAR

# PRÓXIMA TAREFA

# MENSAGEM DE COMMIT

Sugestão:
feat(customer): add customer dashboard UI
