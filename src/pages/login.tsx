import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
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
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-md" htmlFor="email">Email</Label>
              <Input className="text-md p-4" id="email" type="email" placeholder="example@email.com"/>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
