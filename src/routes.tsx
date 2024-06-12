import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/pages/_layouts/app'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
])
