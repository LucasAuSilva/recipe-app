import { useFieldArray } from 'react-hook-form'
import { useFormContextCreateRecipe } from '../create-recipe-form-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CameraIcon, PlusIcon, TrashIcon } from 'lucide-react'

export function CreateDirectionsForm() {
  const { control, register } = useFormContextCreateRecipe()

  const { append, remove, fields } = useFieldArray({ name: 'directions', control })

  function handleAddDirectionClick() {
    append({
      order: fields.length + 1,
      image: undefined,
      description: ''
    })
  }

  function handleRemoveDirectionClick(index: number) {
    remove(index)
  }

  return (
    <>
      {fields?.map((direction, idx) => (
        <div 
          key={direction.id}
          className="flex gap-2"
        >
          <div className="flex gap-2">
            <span className='mt-1'>
              {direction.order.toString().padStart(2, '0')}
            </span>
            <div
              className="w-16 h-16 p-2 bg-gray-100 border border-dashed border-gray-300 rounded-md flex justify-center items-center"
            >
              <CameraIcon
                className="w-5 h-5 text-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-1 gap-2">
            <Input placeholder="Ex: Add oil to an pan and wait 5 minutes" {...register(`directions.${idx}.description`)} />
            <Button variant="ghost" onClick={() => handleRemoveDirectionClick(idx)}>
              <TrashIcon className="text-gray-400 w-5 h-5" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant='outline'
        type="button"
        className="border-primary text-primary"
        onClick={handleAddDirectionClick}
      >
        <PlusIcon
          className="text-primary"
        />
        Add Directions
      </Button>
    </>
  )
}
