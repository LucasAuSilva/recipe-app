import { api } from '@/lib/api'

interface MealCategoriesResponse {
  meals: {
    strCategory: string
  }[]
}

export async function getMealCategories() {
  const response = await api.get<MealCategoriesResponse>('/list.php?c=list')
  return response.data
}
