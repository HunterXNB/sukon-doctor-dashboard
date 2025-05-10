import { AppHeaderPortal } from "@/components/AppHeader";
import AppointmentsApproval from "@/components/dashboard/AppointmentsApproval";
import IncomingAppointments from "@/components/dashboard/IncommingAppointments";
import MoneyChart from "@/components/dashboard/MoneyChart";
import Statistics from "@/components/dashboard/Statistics";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="flex flex-col @container">
      <div className="flex-1 grid @[900px]:grid-cols-[repeat(16,1fr)] @[900px]:grid-rows-[minmax(300px,1fr)_max(500px)] grid-cols-1 gap-4">
        <AppHeaderPortal>
          <div className="w-[40cqi] @md:flex hidden max-w-[470px] gap-[10px] px-4 py-2 border border-[#EBEBEF] h-10 rounded-[10px]  items-center">
            <label htmlFor="search">
              <Search className="w-5 h-5 text-secondary-500" />
            </label>
            <input
              type="text"
              id="search"
              placeholder="بحث"
              className="w-full h-full outline-none bg-transparent text-secondary-500 placeholder:text-secondary-500"
            />
          </div>
          <div className="flex-1 flex @md:hidden items-center justify-end">
            <Button variant={"outline"} size={"icon"}>
              <Search />
            </Button>
          </div>
        </AppHeaderPortal>
        <Statistics />
        <MoneyChart />
        <IncomingAppointments />
        <AppointmentsApproval />
      </div>
    </div>
  );
}

export default page;
