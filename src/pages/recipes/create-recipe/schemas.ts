import { z } from "zod"

export const createDirectionSchema = z.object({
  order: z.number().min(0),
  image: z.string().optional(),
  description: z.string()
})

export const createIngredientSchema = z.object({
  measure: z.object({
    kind: z.string(),
    quantity: z.number().min(1)
  }),
  description: z.string()
})

export const createRecipeFormSchema = z.object({
  name: z.string().min(1),
  category: z.string().refine((val) => val !== 'default', {
    message: 'You must sleect an category for the recipe'
  }),
  numberOfServing: z.number().min(1),
  cookDuration: z.number().min(1),
  origin: z.string().refine((val) => val !== 'default', {
    message: 'You must select an origin for the recipe'
  }),
  tags: z.array(z.string()),
  image: z.string().optional(),
  video: z.string().optional(),
  ingredients: z.array(createIngredientSchema).min(1),
  directions: z.array(createDirectionSchema).min(1)
})

export type CreateRecipeForm = z.infer<typeof createRecipeFormSchema>
export type CreateIngredientSchema = z.infer<typeof createIngredientSchema>
export type createDirectionSchema = z.infer<typeof createDirectionSchema>
