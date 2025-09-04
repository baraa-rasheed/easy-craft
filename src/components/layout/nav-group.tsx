import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  type NavCollapsible,
  type NavGroup,
  type NavItem,
  type NavLink,
} from "./types";
import { Link, useLocation } from "react-router"; 

 
export function NavGroup({ title, items }: NavGroup) {
  const { state } = useSidebar();
  const href = useLocation().pathname;
 
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu className="min-w-48">
        {items.map((item) => { 
          const key = `${item.title}-${item.path}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={href} />;

          if (state === "collapsed")
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
            );

          return <SidebarMenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
  const { setOpenMobile } = useSidebar(); 
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}
      >
        <Link to={href.includes("cms")?`/cms${item.path}`:item.path} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) => {
  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible asChild defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, subItem)}
                >
                  <Link to={subItem.path} onClick={() => setOpenMobile(false)}>
                    <div>
                      {subItem.icon && <subItem.icon className="h-4" />}
                    </div>
                    <span className="capitalize">{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) => {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => (
            <DropdownMenuItem key={`${sub.title}-${sub.path}`} asChild>
              <Link
                to={sub.path}
                className={`${checkIsActive(href, sub) ? "bg-secondary" : ""}`}
              >
                {sub.icon && <sub.icon />}
                <span className="max-w-52 text-wrap">{sub.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  const url = item?.path as string;
  return (
    href === url || // /endpint?search=param
    href.split("?")[0] === url || // endpoint
    href.split("?")[0].startsWith(url as string) || // endpoint
    !!item?.items?.filter((i) => i.path === href).length || // if child nav is active
    (mainNav &&
      href.split("/")[1] !== "" &&
      href.split("/")[1] === url?.split("/")[1])
  );
}
