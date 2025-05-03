import { getUser } from "@/actions/auth";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserContextProvider } from "@/context/UserContext";
import React, { ReactNode } from "react";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  return (
    <div>
      <SidebarProvider>
        <UserContextProvider user={user!}>
          <AppSidebar />
          <main className="bg-slate-100 w-full">{children}</main>
        </UserContextProvider>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
