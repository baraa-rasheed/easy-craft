import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layout/nav-group";
import { NavUser } from "@/components/layout/nav-user";
import { Link } from "react-router";
import { useRouteStore } from "@/store/useRouteStore";
import { groupBy } from "lodash";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const routes = useRouteStore((state) => state.routes);
  const data = groupBy(routes, (r) => r.type);

  const sidebarData = [];

  Object.keys(data).forEach((key) => {
    sidebarData.push({ title: key ?? "", items: data[key] });
  });

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <Link to={"/"} className="flex gap-2">
          <div className="bg-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
            {/* <img className="size-5" src={""} /> */}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Easy Craft</span>
            <span className="truncate text-xs">the best dashboard ever</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
