// external import
import { Outlet } from "react-router";

// internal import
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider className="bg-background text-foreground">
      <AppSidebar />
      <main className="mx-auto w-full ">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
