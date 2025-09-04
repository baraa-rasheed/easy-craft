import { Outlet } from "react-router";
import CMSSidebar from "@/components/cms/cms-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { cn } from "@/lib/utils";
import { Main } from "@/components/layout/main";
import { PlusCircleIcon } from "lucide-react"; 
import RouteFormModal from "@/components/cms/modals/RouteFormModal";
import { useState } from "react";
import { useRouteStore } from "@/store/useRouteStore";

export default function CMSLayout() { 
  const { routes, setRoutes } = useRouteStore();
  const [isRouteModalVisible, setisRouteModalVisible] = useState(false);
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarProvider defaultOpen={true}>
        <div
          id="content"
          className={cn(
            "ml-auto  w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "sm:transition-[width] sm:duration-200 sm:ease-linear",
            "flex flex-col lg:h-svh",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
          )}
        >
          <Header>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitch />
              <ProfileDropdown /> 
                <PlusCircleIcon onClick={()=>setisRouteModalVisible(true)} /> 
            </div>
          </Header>
          <Main>
            <Outlet />
          </Main>
        </div>

        <RouteFormModal
          isVisible={isRouteModalVisible}
          onDismiss={() => setisRouteModalVisible(false)}
          onSubmit={(route) => {
            setisRouteModalVisible(false);
            setRoutes([...routes, { ...route, elements: [] }]);
          }}
        />
        <CMSSidebar side="right" />
      </SidebarProvider>
    </SidebarProvider>
  );
}
