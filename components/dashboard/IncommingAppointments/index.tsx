import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { columns, data } from "./columns";
import { getTranslations } from "next-intl/server";

export default async function IncomingAppointments() {
  const today = new Date();
  const todayDay = today.getDate();
  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const t = await getTranslations("dashboardHome.incomingAppointments");
  return (
    <div className="@[900px]:col-span-10 bg-white rounded-[12px] p-6 flex-col flex gap-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold md:text-xl text-secondary-800">
          {t("title")}
        </h4>
        <Button variant={"outline"} size={"sm"}>
          {t("viewAll")}
        </Button>
      </div>
      <div className="flex overflow-x-auto flex-shrink-0 gap-3 no-scrollbar">
        {[1]
          .reduce((arr) => {
            for (let i = todayDay; i <= lastDayOfMonth; i++) {
              arr.push(i);
            }
            return arr;
          }, [] as number[])
          .map((el) => (
            <Button
              key={el}
              variant={"outline"}
              className="aspect-square last:me-px"
            >
              {el}
            </Button>
          ))}
      </div>
      <div className="@[900px]:max-h-[unset] max-h-[400px] overflow-auto no-scrollbar">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
