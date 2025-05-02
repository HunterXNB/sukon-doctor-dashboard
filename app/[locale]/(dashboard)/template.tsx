import { getUser } from "@/actions/auth";
import AppSidebar from "@/components/AppSidebar";
import { UserContextProvider } from "@/context/UserContext";
import React from "react";

async function DashboardTemplate() {
  const user = await getUser();
  return (
    <UserContextProvider user={user!}>
      <AppSidebar />
    </UserContextProvider>
  );
}

export default DashboardTemplate;
