import { getMealCategories } from '@/api/meal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'

interface CategorySelect {
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ onChange, value }: CategorySelect) {
  const { data, isLoading } = useQuery({
    queryKey: ['mealdb', 'categories'],
    queryFn: getMealCategories
  })

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select an category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'default'}>Select an category</SelectItem>
        {isLoading && data === undefined ? (
          <p>Loading categories...</p>
        ) : (
            data?.meals.map(mealCategory => (
              <SelectItem
                key={mealCategory.strCategory}
                value={mealCategory.strCategory}
              >
                {mealCategory.strCategory}
              </SelectItem>
            ))
        )}
      </SelectContent>
    </Select>
  )
}
