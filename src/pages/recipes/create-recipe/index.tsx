import { CountrySelect } from "@/components/country-select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, UploadIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { CreateRecipeForm } from "./schemas"
import { FormProviderCreateRecipe, useFormContextCreateRecipe } from './create-recipe-form-context'
import { CreateIngredientsForm } from './components/create-ingredients-form'
import { CreateDirectionsForm } from './components/create-directions-form'
import { TextField } from './components/text-field'
import { createRecipeCommand } from '@/lib/commands'
import { CategorySelect } from './components/category-select'

export function CreateRecipe() {
  return (
    <>
      <FormProviderCreateRecipe>
        <CreateRecipeContent />
      </FormProviderCreateRecipe>
    </>
  )
}

function CreateRecipeContent() {
  const navigate = useNavigate()

  const form = useFormContextCreateRecipe()
  const errors = form.formState.errors

  async function onSubmit(data: CreateRecipeForm) {
    console.log(data)
    await createRecipeCommand({
      ...data,
      number_of_serving: data.numberOfServing,
      cook_duration: data.cookDuration
    })
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex-1 gap-6 p-4'
      >
        <div className='mb-4 flex w-full justify-between'>
          <Button variant='ghost' onClick={() => {
            navigate('/')
          }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit">
            Salvar
            <UploadIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className='flex-1 row-span-8 grid grid-cols-3 gap-4'>
          <section className='flex flex-col gap-3'>
            <h2 className='text-xl font-bold text-zinc-500'>
              Recipe General Information
            </h2>
            <div className='bg-white-500 border rounded-lg shadow-md flex flex-col gap-6 justify-center p-4'>
              <TextField
                id="name"
                label='Recipe name'
                error={errors.name}
                {...form.register('name')}
              />
              <TextField
                id="numberOfServing"
                label='Number of serving'
                unit="person"
                type="number"
                error={errors.numberOfServing}
                {...form.register('numberOfServing', {
                  setValueAs: (value) => Number(value)
                })}
              />
              <TextField
                id="cookDuration"
                label='Cook duration'
                unit="minute"
                type="number"
                error={errors.cookDuration}
                {...form.register('cookDuration', {
                  setValueAs: (value) => Number(value)
                })}
              />
              <FormField
                name="origin"
                control={form.control}
                render={({ field }) => (
                  <FormItem
                    className="flex flex-col gap-2"
                  >
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <CountrySelect onChange={field.onChange} defaultValue={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem
                    className="flex flex-col gap-2"
                  >
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategorySelect onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          <section className='flex flex-col col-span-2 gap-3'>
            <h2 className='text-xl font-bold text-zinc-500'>
              Recipe Detail
            </h2>
            <div className='bg-white-500 border rounded-lg shadow-md flex flex-col gap-6 justify-center p-4'>
              <h3 className='text-lg font-semibold'>Ingredients</h3>
              <CreateIngredientsForm />
              <h3 className='text-lg font-semibold'>Directions</h3>
              <CreateDirectionsForm />
            </div>
          </section>
        </div>
      </form>
    </Form>
  )
}
