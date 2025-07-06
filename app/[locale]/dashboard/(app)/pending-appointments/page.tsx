import { AppHeaderPortal } from "@/components/AppHeader";
import { LoadingStyledDataTable } from "@/components/DataTable/StyledDataTable";
import { columns } from "@/components/pending-appointments/columns";
import PendingAppointmentsTable from "@/components/pending-appointments/PendingAppointmentsTable";
import TableSearch from "@/components/table-search";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React, { Suspense } from "react";

interface PendingAppointmentsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function PendingAppointmentsPage({
  searchParams,
}: PendingAppointmentsPageProps) {
  const t = await getTranslations("dashboardHome.topBar");
  const tPendingAppointments = await getTranslations("pendingAppointments");
  const { search } = await searchParams;
  const urlSearchParams = new URLSearchParams();
  if (search) {
    if (typeof search === "string") urlSearchParams.append("search", search);
    else {
      urlSearchParams.append("search", search[0]);
    }
  }

  return (
    <div className="flex flex-col @container">
      <div className="flex-1 gap-6 flex flex-col">
        <AppHeaderPortal>
          <div className="w-[40cqi] @md:flex hidden max-w-[470px] gap-[10px] px-4 py-2 border border-[#EBEBEF] h-10 rounded-[10px]  items-center">
            <label htmlFor="search">
              <Search className="w-5 h-5 text-secondary-500" />
            </label>
            <input
              type="text"
              id="search"
              placeholder={t("search")}
              className="w-full h-full outline-none bg-transparent text-secondary-500 placeholder:text-secondary-500"
            />
          </div>
          <div className="flex-1 flex @md:hidden items-center justify-end">
            <Button variant={"outline"} size={"icon"}>
              <Search />
            </Button>
          </div>
        </AppHeaderPortal>
        <h1 className="text-2xl font-semibold w-full">
          {tPendingAppointments("title")}
        </h1>
        <TableSearch />
        <Suspense fallback={<LoadingStyledDataTable columns={columns} />}>
          <PendingAppointmentsTable searchParams={urlSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default PendingAppointmentsPage;
