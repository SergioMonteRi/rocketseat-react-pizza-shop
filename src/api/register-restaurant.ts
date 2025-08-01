import { api } from '@/lib'

export interface RegisterRestaurantRequest {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export const registerRestaurantAPI = async ({
  restaurantName,
  managerName,
  phone,
  email,
}: RegisterRestaurantRequest) => {
  await api.post('/restaurants', { restaurantName, managerName, phone, email })
}
