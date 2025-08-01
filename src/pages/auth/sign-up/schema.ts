import { z } from 'zod'

export const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, {
    message: 'Nome do estabelecimento obrigatório',
  }),
  managerName: z.string().min(1, {
    message: 'Nome obrigatório',
  }),
  phone: z.string().min(1, {
    message: 'Telefone obrigatório',
  }),
  email: z
    .email({
      message: 'E-mail inválido',
    })
    .min(1, {
      message: 'E-mail obrigatório',
    }),
})
