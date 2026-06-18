export type PurchaseStatus = 'pending' | 'paid' | 'error' | 'cancelled'

export interface CreatePurchaseRequest {
  ticket_ids: number[]
  card_token: string
}

export interface Purchase {
  id: number
  customer_id: number
  purchase_date: string
  total_amount: number
  status: PurchaseStatus
}
