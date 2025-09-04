import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";  
import { Link } from "react-router";

export function ProfileDropdown() { 
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>LTS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">sdf</p>
            <p className="text-muted-foreground text-xs leading-none">
              sdf
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/cms/">
          <DropdownMenuItem>Navigte to CMS</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <a href="/admin/logout">
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
