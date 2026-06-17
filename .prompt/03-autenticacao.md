Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, segurança frontend, autenticação JWT, LGPD, OWASP, React Hook Form, Zod, Axios, TanStack Query e arquitetura frontend escalável.

Assuma o projeto Ticket Sales Web no estado atual.

Contexto:
O frontend consome a API Ticket Sales:

Swagger:
https://ticket-sales-3su2.onrender.com/docs/

O projeto já possui:

- configuração de qualidade de código
- estrutura base
- layout inicial
- cliente Axios
- paleta visual sem tons de azul
- landing page inicial

Objetivo:
Implementar a base de autenticação frontend com foco em segurança, privacidade e LGPD.

━━━━━━━━━━━━━━━━━━━━━━━
FASE 1 — AUDITORIA DO BACKEND
━━━━━━━━━━━━━━━━━━━━━━━

Antes de codar, consulte o Swagger e entenda os endpoints:

- POST /auth/login
- POST /partners/register
- POST /customers/register

Identifique:

- payloads esperados
- formato da resposta de login
- nome do token retornado
- mensagens de erro
- status HTTP possíveis

━━━━━━━━━━━━━━━━━━━━━━━
FASE 2 — TIPOS E CONTRATOS
━━━━━━━━━━━━━━━━━━━━━━━

Criar types para:

- LoginRequest
- LoginResponse
- RegisterCustomerRequest
- RegisterPartnerRequest
- AuthUser
- AuthRole, se aplicável

Criar services:

src/features/auth/services/auth-service.ts

Com métodos:

- login
- registerCustomer
- registerPartner
- logout

━━━━━━━━━━━━━━━━━━━━━━━
FASE 3 — VALIDAÇÕES COM ZOD
━━━━━━━━━━━━━━━━━━━━━━━

Criar schemas:

src/features/auth/validations/auth-schemas.ts

Validações:

- e-mail obrigatório e válido
- senha obrigatória com mínimo adequado
- nome obrigatório
- telefone opcional/obrigatório conforme API
- endereço conforme API
- company_name obrigatório para parceiro
- checkbox de aceite de termos e privacidade no cadastro

Importante LGPD:
No cadastro, incluir aceite explícito:

"Li e aceito os Termos de Uso e a Política de Privacidade."

O frontend deve impedir o cadastro sem esse aceite.

━━━━━━━━━━━━━━━━━━━━━━━
FASE 4 — ARMAZENAMENTO DE TOKEN
━━━━━━━━━━━━━━━━━━━━━━━

Implementar autenticação com JWT de forma consciente.

Regras:

- Não armazenar dados sensíveis desnecessários.
- Armazenar somente o token e dados mínimos do usuário.
- Centralizar acesso ao token.
- Criar helpers:
  - getAccessToken
  - setAccessToken
  - removeAccessToken
  - isAuthenticated

Observação de segurança:
Se o backend ainda retorna apenas JWT via body, usar localStorage temporariamente, mas documentar que em produção o ideal seria cookie httpOnly, Secure e SameSite.

Criar:

src/features/auth/storage/auth-storage.ts

━━━━━━━━━━━━━━━━━━━━━━━
FASE 5 — AUTH CONTEXT / PROVIDER
━━━━━━━━━━━━━━━━━━━━━━━

Criar:

src/features/auth/providers/auth-provider.tsx

Responsável por:

- manter estado do usuário autenticado
- login
- logout
- carregar sessão inicial
- expor isAuthenticated
- expor isLoading
- evitar acessar window/localStorage durante SSR

Criar hook:

src/features/auth/hooks/use-auth.ts

━━━━━━━━━━━━━━━━━━━━━━━
FASE 6 — AXIOS INTERCEPTOR
━━━━━━━━━━━━━━━━━━━━━━━

Atualizar src/lib/api/client.ts:

- adicionar Authorization: Bearer token quando existir
- interceptar 401
- limpar sessão/token em 401
- não logar token no console
- não expor dados sensíveis em mensagens

━━━━━━━━━━━━━━━━━━━━━━━
FASE 7 — TELAS
━━━━━━━━━━━━━━━━━━━━━━━

Criar páginas:

1. Login
   src/app/login/page.tsx

Campos:

- email
- password

2. Cadastro Cliente
   src/app/register/customer/page.tsx

Campos:

- name
- email
- password
- address
- phone
- aceite de termos/LGPD

3. Cadastro Parceiro
   src/app/register/partner/page.tsx

Campos:

- name
- email
- password
- company_name
- aceite de termos/LGPD

Usar:

- React Hook Form
- Zod Resolver
- componentes Shadcn UI
- estados de loading
- feedback de erro com toast
- mensagens amigáveis
- sem expor detalhes técnicos ao usuário

━━━━━━━━━━━━━━━━━━━━━━━
FASE 8 — PROTEÇÃO DE ROTAS
━━━━━━━━━━━━━━━━━━━━━━━

Criar componentes:

- ProtectedRoute
- PublicOnlyRoute, se fizer sentido

Regras:

- usuário não autenticado não acessa dashboards
- usuário autenticado não precisa voltar ao login
- redirecionamento seguro
- evitar open redirect

Rotas protegidas futuras:

- /customer/dashboard
- /partner/dashboard
- /partner/events
- /partner/events/new

━━━━━━━━━━━━━━━━━━━━━━━
FASE 9 — SEGURANÇA E LGPD
━━━━━━━━━━━━━━━━━━━━━━━

Aplicar boas práticas:

1. Não salvar senha, telefone ou endereço em storage.
2. Não expor token em logs.
3. Não persistir dados pessoais além do necessário.
4. Centralizar tratamento de erro.
5. Garantir consentimento explícito nos cadastros.
6. Criar link/placeholder para Política de Privacidade.
7. Criar link/placeholder para Termos de Uso.
8. Evitar mensagens que revelem informação sensível.
9. Sanitizar/validar inputs com Zod.
10. Documentar limitações atuais:

- token em localStorage é aceitável para portfólio, mas produção ideal usaria httpOnly cookie.

Criar documento:

docs/security-and-lgpd.md

Explicar:

- quais dados são coletados
- por que são coletados
- como o frontend minimiza exposição
- boas práticas aplicadas
- melhoria futura: cookies httpOnly

━━━━━━━━━━━━━━━━━━━━━━━
FASE 10 — TESTES/VALIDAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━

Garantir:

- pnpm lint
- pnpm format:check
- pnpm typecheck
- pnpm build

Se o projeto já tiver testes frontend configurados, adicionar testes para:

- schemas Zod
- auth-storage
- auth-provider básico

━━━━━━━━━━━━━━━━━━━━━━━
ENTREGA FINAL
━━━━━━━━━━━━━━━━━━━━━━━

Ao finalizar, entregar:

# O QUE FOI FEITO

# TELAS CRIADAS

# CONCEITOS APLICADOS

Explique:

- autenticação JWT
- validação com Zod
- proteção de rotas
- Axios interceptor
- LGPD
- minimização de dados
- segurança do token

# COMO VALIDAR

# LIMITAÇÕES E MELHORIAS FUTURAS

# MENSAGEM DE COMMIT

Sugestão:
feat(auth): implement secure authentication flow
