import Draggable from "./Dragable";
import { CMS_COMPONENTS, getElementProps } from "../../types/cms";
import components from "..";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import { LayoutDashboardIcon } from "lucide-react";
import { RiDashboard2Fill } from "@remixicon/react";
type IComponentKey = keyof typeof components;

const ComponentsList = () => {
  return Object.keys(CMS_COMPONENTS).map((componentKey) => {
    const currentComponent = CMS_COMPONENTS[componentKey as IComponentKey];
    const CmsComponent = components[componentKey as IComponentKey];
    return (
      <Draggable key={componentKey} id={componentKey}>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div> 
              {<span>{componentKey}</span>}
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Draggable>
    );
  });
};

export default function CMSSidebar(props) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <div className="bg-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
          <LayoutDashboardIcon className="size-5" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">CMS Panel</span>
          <span className="truncate text-xs">
            Drag/drop dashboard components
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarMenu>
            <ComponentsList />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
