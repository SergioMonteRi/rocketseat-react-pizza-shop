import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.email('E-mail obrigatório'),
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>
