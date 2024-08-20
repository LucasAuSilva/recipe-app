import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRecipeById } from '@/api/recipes'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CameraIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function RecipeDetail() {
  const params = useParams()
  const navigate = useNavigate()

  const { data: recipe, isLoading } = useQuery({
    queryKey: [ 'recipes', params.recipeId ],
    queryFn: async () => {
      const result = await getRecipeById({ id: params.recipeId ?? '' })
      return result
    }
  })

  return (
    <div className='flex-1 gap-6 p-4'>
      <div className='mb-4'>
        <Button variant='ghost' onClick={() => {
          navigate('/')
        }}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className='flex-1 row-span-8 grid grid-cols-3 gap-4'>
        <section className='flex flex-col gap-3'>
          <h2 className='text-xl font-bold text-zinc-500'>
            Recipe General Information
          </h2>
          {!isLoading && recipe != undefined ? (
            <div className='bg-white-500 border rounded-lg shadow-md flex flex-col gap-6 justify-center p-4'>
              <div className='bg-gray-200 rounded-lg'>
                <img
                  className='h-32 w-full object-contain rounded-lg'
                  src={recipe.image}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Recipe name</Label>
                <Input type='text' value={recipe.name} disabled/>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Number of serving</Label>
                <Input type='number' value={recipe.numberOfServing} disabled/>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Cook duration</Label>
                <Input type='number' value={recipe.cookDuration} disabled/>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Origin</Label>
                <Input type='text' value={recipe.origin} disabled/>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Input type='text' value={recipe.category} disabled/>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tags</Label>
                <div className="flex gap-1">
                  {recipe.tags === undefined ? (
                    <span className='text-sm font-light ml-2'>There is no tags registered to this item.</span>
                  ) : 
                    recipe.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                    ))
                  }
                </div>
              </div>
            </div>
          ) : (<p>Loading..</p>)}
        </section>
        <section className='flex flex-col col-span-2 gap-3'>
          <h2 className='text-xl font-bold text-zinc-500'>
            Recipe Detail
          </h2>
          <div className='bg-white-500 border rounded-lg shadow-md flex flex-col gap-6 justify-center p-4'>
            <h3 className='text-lg font-semibold'>Ingredients</h3>
              {recipe ? (
                <ul>
                  {recipe.ingredients.map(ingredient => (
                    <li className='flex gap-1' key={ingredient.id}>
                      <span>
                        {`${ingredient.measure.quantity} ${ingredient.measure.kind}`}
                      </span>
                      <span>-&gt;</span>
                      <span>{ingredient.description}</span>
                    </li>
                  ))}
                </ul>
              ) : (<p>Loading..</p>)}
            <h3 className='text-lg font-semibold'>Directions</h3>
              {recipe ? (
                <ol className="flex flex-col gap-2">
                  {recipe.directions.map(direction => (
                    <li className='flex gap-2' key={direction.id}>
                      <span className='mt-2 w-4 mr-1'>
                        {direction.order.toString().padStart(2, '0')}
                      </span>
                      <div
                        className="w-16 h-16 p-2 bg-gray-100 border border-dashed border-gray-300 rounded-md flex justify-center items-center"
                      >
                        <CameraIcon
                          className="w-5 h-5 text-gray-600"
                        />
                      </div>
                      <p className='mt-2'>
                        {direction.description}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (<p>Loading...</p>)}
          </div>
        </section>
      </div>
    </div>
  )
}
