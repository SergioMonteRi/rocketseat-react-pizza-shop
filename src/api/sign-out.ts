import { api } from '@/lib/axios'

export const signOutAPI = async () => {
  await api.post('/sign-out')
}
