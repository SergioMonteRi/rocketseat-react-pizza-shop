import { api } from '@/lib'

export interface SignInRequest {
  email: string
}

export const signInAPI = async ({ email }: SignInRequest) => {
  await api.post('/authenticate', { email })
}
