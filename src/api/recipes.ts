import { Meal } from "@/@types/meal"
import { Recipe } from "@/@types/recipe"
import { api } from "@/lib/api"
import { mealToRecipe } from "@/utils/meal-convertor"

interface GetRecipeByIdParams {
  id: string
}

export async function getRecipeById({
  id
}: GetRecipeByIdParams): Promise<Recipe | undefined> {
  const response = await api.get<{ meals: Meal[] | null }>(`/lookup.php?i=${id}`)
  if (response.data.meals == null) return undefined
  return mealToRecipe(response.data.meals[0])
}

