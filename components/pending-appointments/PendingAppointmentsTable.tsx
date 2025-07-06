import { fetchData } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import { PendingAppointment } from "@/types/PendingAppointment";
import StyledDataTable from "@/components/DataTable/StyledDataTable";
import { columns } from "./columns";
import { redirect } from "@/i18n/routing";
import { getLocale } from "@/actions/intl";
import { Pagination } from "../Pagination";

async function PendingAppointmentsTable({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const locale = await getLocale();
  const req = await fetchData(
    `/doctor-dashboard/appointments/index?${searchParams}`
  );
  if (!req.ok) redirect({ href: "/", locale });
  const data = (await req.json()).data;
  const appointments = data ? (data.data as PendingAppointment[]) : [];

  const appointmentsMeta: ResponseMeta = data.meta;

  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        <StyledDataTable columns={columns} data={appointments}>
          <Pagination meta={appointmentsMeta} />
        </StyledDataTable>
      </div>
    </>
  );
}

export default PendingAppointmentsTable;
