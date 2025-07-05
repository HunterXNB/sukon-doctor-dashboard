import { fetchData } from "@/lib/utils";
import { ResponseMeta } from "@/types/response-meta";
import { Patient } from "@/types/Patient";
import StyledDataTable from "@/components/DataTable/StyledDataTable";
import { columns } from "./columns";
import { redirect } from "@/i18n/routing";
import { getLocale } from "@/actions/intl";
import { Pagination } from "../Pagination";
async function PatientsListTable({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const locale = await getLocale();
  const req = await fetchData(
    `/doctor-dashboard/patients/index?${searchParams}`
  );
  if (!req.ok) redirect({ href: "/", locale });
  const data = (await req.json()).data;
  const patients = data ? (data.data as Patient[]) : [];

  const patientsMeta: ResponseMeta = data.meta;

  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        <StyledDataTable columns={columns} data={patients}>
          <Pagination meta={patientsMeta} />
        </StyledDataTable>
      </div>
    </>
  );
}

export default PatientsListTable;
