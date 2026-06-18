export const endpoints = {
  health: '/health',
  auth: {
    login: '/auth/login'
  },
  partners: {
    register: '/partners/register',
    events: '/partners/events',
    eventTickets: (eventId: number) => `/partners/events/${eventId}/tickets`,
    eventHistory: (eventId: number) => `/partners/events/${eventId}/history`,
    reservations: '/partners/events/reservations',
    purchases: '/partners/events/purchases',
    cancelPurchase: (purchaseId: number) => `/partners/events/purchases/${purchaseId}/cancel`
  },
  customers: {
    register: '/customers/register',
    purchases: '/customers/purchases',
    reservations: '/customers/reservations'
  },
  events: {
    list: '/events',
    detail: (eventId: number) => `/events/${eventId}`
  }
} as const
