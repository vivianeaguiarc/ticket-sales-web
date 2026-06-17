import { z } from 'zod'

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Informe seu e-mail.')
  .email('Informe um e-mail válido.')

const passwordSchema = z
  .string()
  .min(6, 'A senha deve ter no mínimo 6 caracteres.')
  .max(128, 'A senha deve ter no máximo 128 caracteres.')

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Informe seu nome completo.')
  .max(255, 'O nome deve ter no máximo 255 caracteres.')

const termsSchema = z.boolean().refine((value) => value === true, {
  message: 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
})

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const registerCustomerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  address: z
    .string()
    .trim()
    .min(3, 'Informe seu endereço.')
    .max(255, 'O endereço deve ter no máximo 255 caracteres.'),
  phone: z
    .string()
    .trim()
    .min(10, 'Informe um telefone válido.')
    .max(20, 'O telefone deve ter no máximo 20 caracteres.')
    .regex(/^[\d\s()+-]+$/, 'Informe um telefone válido.'),
  acceptTerms: termsSchema
})

export const registerPartnerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  company_name: z
    .string()
    .trim()
    .min(2, 'Informe o nome da empresa.')
    .max(255, 'O nome da empresa deve ter no máximo 255 caracteres.'),
  acceptTerms: termsSchema
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterCustomerFormValues = z.infer<typeof registerCustomerSchema>
export type RegisterPartnerFormValues = z.infer<typeof registerPartnerSchema>
