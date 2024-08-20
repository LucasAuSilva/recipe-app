import { ReactNode } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { CreateRecipeForm, createRecipeFormSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'

export function FormProviderCreateRecipe({ children }: { children: ReactNode }) {
  const methods = useForm<CreateRecipeForm>({
    resolver: zodResolver(createRecipeFormSchema),
    defaultValues: {
      origin: 'default',
      tags: [],
      ingredients: []
    },
  })

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}

export const useFormContextCreateRecipe = () => useFormContext<CreateRecipeForm>()

