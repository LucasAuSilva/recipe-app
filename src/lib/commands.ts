import { invoke } from '@tauri-apps/api'

interface CreateDirections {
  order: number
  description: string
  image?: string
}

interface CreateIngredient {
  measure: {
    kind: string
    quantity: number
  }
  description: string
}

interface CreateRecipe {
  name: string
  origin: string
  category: string
  cook_duration: number
  number_of_serving: number
  image?: string
  video?: string
  tags: string[]
  ingredients: CreateIngredient[]
  directions: CreateDirections[]
}

export async function createRecipeCommand(recipe: CreateRecipe) {
  return await invoke('create_recipe', { recipe })
}

export async function signUp(email: string): Promise<boolean> {
  return await invoke('sign_up', { email: email })
}
