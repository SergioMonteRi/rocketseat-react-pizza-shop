import z from 'zod'

export const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

export type OrderFilters = z.infer<typeof orderFiltersSchema>
