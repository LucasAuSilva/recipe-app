import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

interface RecipeCardProps {
  recipe: {
    id: string
    name: string
    category: string
    origin: string
    tags: string[]
    image: string
  }
}

export function RecipeCard({
  recipe
}: RecipeCardProps) {
  const navigate = useNavigate()

  function handleCardClick() {
    navigate(`/recipes/${recipe.id}`)
  } 

  return (
    <Card
      onClick={() => handleCardClick()}
      className='w-64 cursor-pointer transition duration-300 ease-in-out hover:shadow-md'
    >
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>
          <span>{recipe.origin} - {recipe.category}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
      <img
        src={recipe.image}
        className='border rounded-lg w-full'
      />
      </CardContent>
      {recipe.tags?.length > 0 && (
        <CardFooter
          className='flex flex-wrap gap-2'
        >
          {recipe.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
