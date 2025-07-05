"use client";

import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Patient } from "@/types/Patient";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { formatDistanceToNow } from "date-fns";
import { arSA, enUS } from "date-fns/locale";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: HeaderCell,
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"/avatar.svg"} alt={patient.name} />
            <AvatarFallback>
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium">{patient.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "last_active_at",
    header: HeaderCell,
    cell: LastActiveCell,
  },
  {
    accessorKey: "summary",
    header: HeaderCell,
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600">
          {row.getValue("summary") || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "next_appointment",
    header: HeaderCell,
    cell: NextAppointmentCell,
  },
  {
    accessorKey: "status",
    header: HeaderCell,
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600">{row.getValue("status")}</div>
      );
    },
  },
  {
    accessorKey: "action",
    header: HeaderCell,
    cell: ActionsCell,
  },
];
function HeaderCell({ header }: HeaderContext<Patient, unknown>) {
  const t = useTranslations("patientsList.table.header");
  return (
    <p
      className={cn("text-secondary-800 text-xs font-medium", {
        "text-end": header.id === "options",
      })}
    >
      {t(header.id)}
    </p>
  );
}
function NextAppointmentCell({ row }: CellContext<Patient, unknown>) {
  const locale = useLocale();
  const nextAppointment = row.original.next_appointment;
  const isoDateTimeString = `${nextAppointment.date}T${nextAppointment.start_time}`;

  const eventDate = new Date(isoDateTimeString);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat(locale, options);
  const parts = formatter.formatToParts(eventDate);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;

  const customFormat = `${day} ${month} - ${hour}:${minute} ${dayPeriod}`;
  return <div className="text-sm text-gray-600">{customFormat}</div>;
}

function LastActiveCell({ row }: CellContext<Patient, unknown>) {
  const locale = useLocale();
  const lastActiveDate = new Date(row.getValue("last_active_at"));

  const timeAgo = formatDistanceToNow(lastActiveDate, {
    locale: locale === "ar" ? arSA : enUS,
    addSuffix: true,
  });
  return <div className="text-sm text-gray-600">{timeAgo}</div>;
}
function ActionsCell() {
  const t = useTranslations("patientsList.table.actions");
  return (
    <div className="flex gap-2">
      <Button size="sm" variant={"outline"}>
        {t("showDetails")}
      </Button>
      <Button size={"sm"}>{t("addTask")}</Button>
    </div>
  );
}
