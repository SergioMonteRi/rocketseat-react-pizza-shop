import { z } from 'zod'

export const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.email('E-mail obrigatório'),
})
