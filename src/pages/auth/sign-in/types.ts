import { z } from 'zod'

import { signInFormSchema } from './schema'

export type SignInFormData = z.infer<typeof signInFormSchema>
