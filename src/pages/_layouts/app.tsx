import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEYS } from '@/configs/constants'
import { Header } from '@/components/header'
import { signUp } from '@/lib/commands'

export function AppLayout() {
  const navigate = useNavigate()

  async function auth(): Promise<boolean> {
    const userAsString = localStorage.getItem(LOCAL_STORAGE_KEYS.User)
    if (!userAsString) return false
    const user = JSON.parse(userAsString) as { email: string }
    return signUp(user.email)
  }

  useEffect(() => {
    auth().then(isAuth => {
      if (!isAuth) {
        navigate('/login')
      }
    })
  })

  return (
    <div className='flex min-h-screen flex-col antialiased bg-white-600'>
      <Header />
      <div className='flex flex-1 flex-col px-4 py-1'>
        <Outlet />
      </div>
    </div>
  )
}
