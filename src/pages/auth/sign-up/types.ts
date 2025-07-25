import { z } from 'zod'

import { signUpFormSchema } from './schema'

export type SignUpFormData = z.infer<typeof signUpFormSchema>
