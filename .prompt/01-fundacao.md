Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, Axios, React Hook Form, Zod, arquitetura frontend escalável e integração com APIs REST.

Vamos iniciar o frontend do projeto Ticket Sales Web.

Contexto:
O backend Ticket Sales já está publicado e documentado:

Swagger:
https://ticket-sales-3su2.onrender.com/docs/

Repositório backend:
https://github.com/vivianeaguiarc/ticket-sales

Objetivo do frontend:
Criar uma aplicação web profissional para consumir a API Ticket Sales, demonstrando domínio de frontend moderno, autenticação JWT, formulários, validações, proteção de rotas, consumo de API, estados assíncronos e arquitetura organizada.

Stack obrigatória:

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- TanStack Query
- Axios
- React Hook Form
- Zod
- ESLint
- Prettier

Primeira tarefa:
Criar o setup inicial do projeto frontend com estrutura profissional.

Implementar:

1. Criar projeto Next.js com TypeScript e App Router.
2. Configurar Tailwind CSS.
3. Configurar Shadcn UI.
4. Configurar ESLint e Prettier.
5. Criar estrutura de pastas:

src/
app/
components/
ui/
layout/
feedback/
features/
auth/
events/
tickets/
reservations/
purchases/
partner/
customer/
lib/
api/
validations/
utils/
hooks/
types/
providers/

6. Criar arquivo de configuração da API:
   src/lib/api/client.ts

Com Axios configurado para usar:

NEXT_PUBLIC_API_URL=https://ticket-sales-3su2.onrender.com

7. Criar .env.example com:
   NEXT_PUBLIC_API_URL=

8. Criar providers globais:

- TanStack Query Provider
- Theme Provider, se usar tema
- Toaster para feedback

9. Criar layout base:

- Navbar
- Footer
- Container
- Página inicial simples

10. Garantir comandos:

- pnpm dev
- pnpm lint
- pnpm build

11. Ao finalizar, entregue:

# O QUE FOI FEITO

# ESTRUTURA CRIADA

# COMO RODAR

# PRÓXIMA TAREFA

# MENSAGEM DE COMMIT

Sugestão de commit:
chore(web): initialize ticket sales frontend
