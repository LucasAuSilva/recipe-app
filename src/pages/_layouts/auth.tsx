import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
