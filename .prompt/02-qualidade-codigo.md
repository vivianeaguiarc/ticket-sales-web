Você é um Frontend Engineer Sênior especialista em Next.js, TypeScript, React, ESLint, Prettier, Husky, lint-staged, Conventional Commits, qualidade de código, padronização de projetos frontend e boas práticas de engenharia.

Assuma o projeto frontend Ticket Sales Web no estado atual.

Objetivo:
Configurar a base de qualidade de código do projeto com ESLint, Prettier, ordenação de imports, hooks de commit e validação de mensagens de commit.

Contexto:
Este projeto é o frontend do Ticket Sales, uma plataforma de venda de ingressos integrada com a API:

Swagger:
https://ticket-sales-3su2.onrender.com/docs/

Stack esperada do frontend:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Shadcn UI
- TanStack Query
- Axios
- React Hook Form
- Zod

Ferramentas obrigatórias:

- ESLint
- Prettier
- eslint-config-prettier
- eslint-plugin-simple-import-sort
- Husky
- lint-staged
- commit-msg-linter

Tarefas:

1. Auditar o projeto atual:

- package.json
- eslint.config._ ou .eslintrc._
- tsconfig.json
- estrutura src/
- arquivos de configuração existentes
- versão do Next.js

2. Instalar dependências necessárias de desenvolvimento:

- prettier
- eslint-config-prettier
- eslint-plugin-simple-import-sort
- husky
- lint-staged
- commit-msg-linter

3. Configurar ESLint:

- preservar regras padrão do Next.js
- adicionar simple-import-sort
- adicionar integração com Prettier
- configurar ordenação de imports
- bloquear imports desorganizados
- evitar any quando possível
- manter compatibilidade com TypeScript e React

4. Configurar Prettier:
   Criar ou ajustar:

- .prettierrc
- .prettierignore

Regras sugeridas:

- semi: false
- singleQuote: true
- trailingComma: none
- printWidth: 100
- tabWidth: 2

5. Configurar scripts no package.json:
   Adicionar ou ajustar:

- lint
- lint:fix
- format
- format:check
- typecheck
- prepare

6. Configurar Husky:
   Criar hooks:

.husky/pre-commit
Executar:

- lint-staged

.husky/commit-msg
Executar:

- commit-msg-linter

7. Configurar lint-staged:
   Para arquivos:

- ts
- tsx
- js
- jsx
- json
- md
- css

Ações:

- eslint --fix
- prettier --write

8. Garantir padrão de commit:
   Mensagens devem seguir Conventional Commits:

Exemplos válidos:

- feat: add login page
- fix: correct auth token handling
- chore: configure code quality tools
- docs: update readme
- refactor: improve layout structure
- test: add auth tests

9. Rodar validações:

- pnpm lint
- pnpm format:check
- pnpm typecheck
- pnpm build

10. Corrigir todos os erros encontrados sem desativar regras importantes.

11. Ao finalizar, entregar:

# O QUE FOI FEITO

Explique ferramentas configuradas e arquivos alterados.

# SCRIPTS DISPONÍVEIS

Liste os scripts criados no package.json.

# COMO VALIDAR

Informe os comandos para testar a configuração.

# PADRÃO DE COMMIT

Explique exemplos de mensagens aceitas.

# MENSAGEM DE COMMIT

Sugira uma mensagem Conventional Commit.

Sugestão:
chore: configure code quality tools
