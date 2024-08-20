export interface Direction {
  id: string
  order: number
  image?: string
  description: string
}

export interface Ingridient {
  id: string,
  measure: {
    kind: string
    quantity: number
  },
  description: string
}

export interface Recipe {
  id: string
  name: string
  numberOfServing?: number
  cookDuration?: number
  category: string
  origin: string
  tags: string[]
  image?: string
  video: string
  ingredients: Ingridient[]
  directions: Direction[]
}
