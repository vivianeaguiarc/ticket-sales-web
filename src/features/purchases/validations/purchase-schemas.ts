import { z } from 'zod'

export const purchaseFormSchema = z.object({
  card_token: z
    .string()
    .trim()
    .min(1, 'Informe o token do cartão para concluir a compra.')
    .max(128, 'Token do cartão inválido.')
})

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>
