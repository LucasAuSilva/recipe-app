import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api'

export function AppLayout() {
// Example for commands with rust
// const [greetMsg, setGreetMsg] = useState("");
// const [name, setName] = useState("");
//
// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   setGreetMsg(await invoke("greet", { name }));
// }
  const [user, setUser] = useState('not_login')
  const navigate = useNavigate()

  async function auth(): Promise<boolean> {
    return await invoke('auth', { email: user })
  }

  useEffect(() => {
    auth().then(isAuth => {
      if (!isAuth) {
        navigate('/login')
      }
    })
  })

  return (
    <div className='flex min-h-screen flex-col antialiased bg-white-500'>
      <h1>Here some layout for the app :)</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
