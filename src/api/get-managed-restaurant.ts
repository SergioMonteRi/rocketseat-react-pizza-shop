import { api } from '@/lib'

export interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export const getManagedRestaurantAPI =
  async (): Promise<GetManagedRestaurantResponse> => {
    const { data } = await api.get<GetManagedRestaurantResponse>(
      '/managed-restaurant',
    )

    return data
  }
