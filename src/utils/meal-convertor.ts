import { Meal } from '@/@types/meal'
import { Direction, Ingridient, Recipe } from '@/@types/recipe';

export function mealToRecipe(meal: Meal): Recipe {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    numberOfServing: 0,
    cookDuration: 0,
    category: meal.strCategory,
    origin: meal.strArea,
    tags: meal.strTags?.split(','),
    image: meal.strMealThumb,
    video: meal.strYoutube,
    ingredients: ingredientsConvertor(meal),
    directions: directionsConvertor(meal)
  } 
}

function ingredientsConvertor(meal: Meal): Ingridient[] {
  const ingredients: Ingridient[] = []
  for (let x = 0; x < 20; x++) {
    const ingridient: string = meal[`strIngredient${x+1}` as keyof Meal] 
    if (ingridient.length <= 0) {
      break
    }
    const measure: string[] = (meal[`strMeasure${x+1}` as keyof Meal] as string)
      .split(' ')
    ingredients.push({
      id: (x+1).toString(),
      measure: measureConvertor(measure),
      description: ingridient
    })
  }
  return ingredients
}

function measureConvertor(measure: string[]): { kind: string, quantity: number } {
  let kind = ''
  let quantity = 0
  if (measure.length === 1 && measure[0].includes('rd')) {
    kind = 'Pcs'
    quantity = parseInt(measure[0].replace('rd', ''))
  } else if (measure.length === 1 && !isNaN(+measure[0])) {
    kind = 'Pcs'
    quantity = parseInt(measure[0])
  } else {
    kind = measure.length > 1 ? measure[1] : measure[0]
    quantity = measure.length > 1 ? (parseInt(measure[0])) : 1
  }
  return {
    kind,
    quantity
  }
}

function directionsConvertor(meal: Meal): Direction[] {
  const directions: Direction[] = []
  const instructions = meal.strInstructions.split('\r\n')
  instructions.forEach((instruction, idx) => {
    directions.push({
      id: `${meal.idMeal}-${idx+1}`,
      order: (idx+1),
      description: instruction
    })
  })
  return directions
}
