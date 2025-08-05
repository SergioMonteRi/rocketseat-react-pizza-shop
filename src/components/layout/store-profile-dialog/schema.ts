import { z } from 'zod'

export const storeProfileDialogSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
})

export type StoreProfileDialogSchema = z.infer<typeof storeProfileDialogSchema>
