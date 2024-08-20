import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants";
import { invoke } from "@tauri-apps/api";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string
}

export function Login() {
  const { register, handleSubmit } = useForm<IFormInput>()

  const navigate = useNavigate()

  async function onSubmitForm(data: IFormInput) {
    try {
      const isAuth = await invoke('auth', { email: data.email })
      if (!isAuth) {
        console.log('Failed to authenticate')
        toast.error('Authentication failed', {
          description: 'It seems you cannot access the app, contact an admin and try again.',
        })
        return
      }
      localStorage.setItem(LOCAL_STORAGE_KEYS.User, JSON.stringify(data))
      navigate('/')
    } catch {
      toast.error('Some error has occur, please contact the IT for the issue.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Login
          </CardTitle>
          <CardDescription>
            Enter your credentials here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label className="text-md" htmlFor="email">Email</Label>
              <Input 
                className="text-md p-4"
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
