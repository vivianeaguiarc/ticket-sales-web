/**
 * A API (Swagger) não expõe endpoints GET para histórico do cliente.
 * Histórico exibido no dashboard vem do cache em memória (TanStack Query),
 * populado após POST /partners/events/reservations e POST /partners/events/purchases.
 *
 * TODO(backend): quando existir GET /customers/purchases e GET /customers/reservations,
 * habilitar fetch nos hooks useCustomerPurchases e useCustomerReservations.
 */
export const HAS_CUSTOMER_PURCHASES_LIST_ENDPOINT = false
export const HAS_CUSTOMER_RESERVATIONS_LIST_ENDPOINT = false

export const CUSTOMER_HISTORY_EMPTY_MESSAGE =
  'Seu histórico aparecerá aqui quando houver dados disponíveis.'
