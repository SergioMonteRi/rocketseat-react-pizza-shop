import { api } from '@/lib'

interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export const getProfileAPI = async (): Promise<GetProfileResponse> => {
  const { data } = await api.get<GetProfileResponse>('/me')

  return data
}
