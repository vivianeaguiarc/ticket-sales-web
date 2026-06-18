export const customerQueryKeys = {
  all: ['customer'] as const,
  purchases: () => [...customerQueryKeys.all, 'purchases'] as const,
  purchase: (purchaseId: number) => [...customerQueryKeys.all, 'purchase', purchaseId] as const,
  reservations: () => [...customerQueryKeys.all, 'reservations'] as const
}
