# Segurança e LGPD — TicketSales Web

Este documento descreve as práticas de segurança e privacidade aplicadas no frontend do projeto TicketSales.

## Dados coletados no frontend

| Dado                            | Momento           | Persistido no navegador?      |
| ------------------------------- | ----------------- | ----------------------------- |
| E-mail                          | Login / cadastro  | Sim (apenas e-mail na sessão) |
| Senha                           | Login / cadastro  | Não                           |
| Nome                            | Cadastro          | Não                           |
| Endereço                        | Cadastro cliente  | Não                           |
| Telefone                        | Cadastro cliente  | Não                           |
| Nome da empresa                 | Cadastro parceiro | Não                           |
| JWT (token)                     | Login             | Sim (`localStorage`)          |
| Perfil (`customer` / `partner`) | Login             | Sim (`localStorage`)          |

## Finalidade do tratamento

- **Autenticação:** identificar o usuário nas requisições à API.
- **Autorização:** direcionar o usuário à área correta (cliente ou parceiro).
- **Cadastro:** enviar dados ao backend para criação de conta.

## Minimização de dados

O frontend segue o princípio da minimização (LGPD, art. 6º, III):

1. Não armazena senha após o envio do formulário.
2. Não persiste telefone, endereço ou nome da empresa localmente.
3. Mantém apenas `token`, `e-mail`, `userId` e `role` necessários à sessão.
4. Não registra token ou credenciais no console.
5. Mensagens de erro são genéricas para evitar enumeração de contas.

## Consentimento (LGPD)

Nos formulários de cadastro, o usuário deve marcar explicitamente:

> "Li e aceito os Termos de Uso e a Política de Privacidade."

O envio é bloqueado pelo Zod caso o aceite não seja confirmado.

## Boas práticas de segurança aplicadas

| Prática                    | Implementação                               |
| -------------------------- | ------------------------------------------- |
| Validação de entrada       | Zod + React Hook Form                       |
| JWT em requisições         | Interceptor Axios (`Authorization: Bearer`) |
| Sessão expirada            | Interceptor 401 limpa storage e redireciona |
| Proteção de rotas          | Middleware + `ProtectedRoute`               |
| Open redirect              | `sanitizeRedirectPath` valida URLs internas |
| OWASP — exposição de dados | Erros amigáveis, sem detalhes técnicos      |
| OWASP — logging sensível   | Token nunca logado                          |

## Armazenamento do token

**Situação atual (portfólio):** o JWT é armazenado em `localStorage`, com cookie auxiliar `ts_session` (flag booleana) apenas para o middleware do Next.js.

**Limitação:** `localStorage` é acessível por JavaScript e vulnerável a XSS.

**Melhoria futura recomendada para produção:**

- Cookie `httpOnly`, `Secure` e `SameSite=Strict` emitido pelo backend.
- Refresh token rotativo.
- Content Security Policy (CSP) rigorosa.
- Rate limiting e proteção CSRF no backend.

## Detecção de perfil

O JWT da API contém apenas `{ id, email }`. O frontend detecta o perfil consultando `GET /partners/events`:

- `200` → parceiro
- `403` → cliente

## Referências

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [LGPD — Lei nº 13.709/2018](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
