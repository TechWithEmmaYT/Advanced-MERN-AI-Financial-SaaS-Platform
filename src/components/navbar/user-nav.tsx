import {
    Avatar,
    AvatarFallback,
  } from "../ui/avatar"
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  
  export function UserNav() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-10 w-10 !cursor-pointer">
              <AvatarFallback className="!bg-[var(--secondary-dark-color)] border !border-gray-700
               !text-white">SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 !bg-[var(--secondary-dark-color)] !text-white
         !border-gray-700
        "  align="end" forceMount>
          <DropdownMenuItem className="hover:!bg-gray-800 hover:!text-white">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }