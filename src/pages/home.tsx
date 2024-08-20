import { RecipeCard } from '@/components/recipe-card'

interface Recipe {
  id: string
  name: string
  category: string
  origin: string
  tags: string[]
  image: string
}

const recipes: Recipe[] = [{
  id: '52804',
  name: 'Poutine',
  category: 'Miscellaneous',
  origin: 'Canadian',
  tags: ['UnHealthy', 'Speciality' , 'HangoverFood'],
  image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg'
}, {
  id: '52769',
  name: 'Kapsalon',
  category: 'Lamb',
  origin: 'Dutch',
  tags: ['Snack'],
  image: 'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg'
}, {
  id: '53076',
  name: 'Bread omelette',
  category: 'Breakfast',
  origin: 'Indian',
  tags: [],
  image: 'https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg'
}]

export function Home() {
  return (
    <div className='flex gap-2'>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </div>
  )
}
