import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/pages/_layouts/app'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { AuthLayout } from '@/pages/_layouts/auth'
import { RecipeDetail } from '@/pages/recipes/recipe-detail'
import { CreateRecipe } from '@/pages/recipes/create-recipe'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/recipes/:recipeId', element: <RecipeDetail /> },
      { path: '/recipes/create', element: <CreateRecipe /> },
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> }
    ]
  }
])
