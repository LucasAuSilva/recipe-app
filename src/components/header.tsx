import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from '@/components/ui/separator'
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

export function Header() {
  const navigate = useNavigate()

  return (
    <header className='pt-4 px-4 bg-white-500'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={(() => navigate('/'))}
            >
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col p-2 transition-all ease-in-out">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to={'/recipes/create'}
                    >
                      <Button variant='ghost'>New recipe</Button>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to={'/recipes/my'}>
                      <Button variant='ghost'>Your recipes</Button>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Subscriptions
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Analytics
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    <Separator className='mt-2' />
    </header>
  )
}
