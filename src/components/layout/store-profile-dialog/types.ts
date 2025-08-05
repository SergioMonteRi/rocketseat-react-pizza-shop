import { z } from 'zod'

import { storeProfileDialogSchema } from './schema'

export type StoreProfileDialogSchema = z.infer<typeof storeProfileDialogSchema>
