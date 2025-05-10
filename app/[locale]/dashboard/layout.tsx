import { getUser } from "@/actions/auth";
import AppHeader from "@/components/AppHeader";
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

          <main className="bg-gray-50 w-full">
            <AppHeader />
            <div className="py-6 px-4 lg:px-12 md:min-h-[calc(100vh-80px)] flex flex-col">
              {children}
            </div>
          </main>
        </UserContextProvider>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
