import { MeasureTypeSelect } from "@/components/fields/measure-type-select";
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PlusIcon, TrashIcon } from "lucide-react"
import { useFormContextCreateRecipe } from '../create-recipe-form-context'
import { useFieldArray } from 'react-hook-form'

export function CreateIngredientsForm() {
  const { control, register } = useFormContextCreateRecipe()

  const { append, remove, fields } = useFieldArray({ name: 'ingredients', control })

  function handleAddIngridientClick() {
    append({
      description: '',
      measure: {
        type: 'gram',
        quantity: 0
      }
    })
  }

  function handleRemoveIngredientClick(index: number) {
    remove(index)
  }

  return (
    <>
      {fields?.map((ingredient, idx) => (
        <div 
          key={ingredient.id}
          className="flex gap-2"
        >
          <div className="flex">
            <Input
              className="w-24 outline-none focus-visible:ring-0 border-r-0"
              placeholder="Ex: 10"
              {...register(`ingredients.${idx}.measure.quantity`, {
                setValueAs: (value) => Number(value)
              })}
            />
            <FormField
              name={`ingredients.${idx}.measure.kind`}
              control={control}
              render={({ field }) => (
                <FormItem
                  className="flex flex-col gap-2"
                >
                  <FormControl>
                    <MeasureTypeSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-1 gap-2">
            <Input placeholder="Eg: Chicken egg" {...register(`ingredients.${idx}.description`)} />
            <Button variant="ghost" onClick={() => handleRemoveIngredientClick(idx)}>
              <TrashIcon className="text-gray-400 w-5 h-5" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant='outline'
        type="button"
        className="border-primary text-primary"
        onClick={handleAddIngridientClick}
      >
        <PlusIcon
          className="text-primary"
        />
        Add Ingridients
      </Button>
    </>
  )
}
