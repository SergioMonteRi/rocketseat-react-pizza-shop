import { api } from '@/lib'

interface UpdateProfileBody {
  name: string
  description: string
}

export async function updateProfileAPI({
  name,
  description,
}: UpdateProfileBody) {
  const { data: response } = await api.put('/profile', {
    name,
    description,
  })

  return response
}
