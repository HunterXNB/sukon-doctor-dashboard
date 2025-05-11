"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export type Appointment = {
  id: string;
  user: {
    name: string;

    image: string;
  };
  type: "استشارة فردية";
  time: Date;
};
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "user",
    header: HeaderCell,
    cell: UserCell,
  },
  {
    accessorKey: "type",
    header: HeaderCell,
    cell: TypeCell,
  },
  {
    accessorKey: "time",
    header: HeaderCell,
    cell: TimeCell,
  },
  {
    id: "options",
    cell: ActionCell,
    header: HeaderCell,
  },
];
function ActionCell({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  row,
}: CellContext<Appointment, unknown>) {
  // const role = row.original;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-full justify-end">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
function UserCell({ row }: CellContext<Appointment, unknown>) {
  const { user } = row.original;
  return (
    <div className="flex items-center gap-3 @md/table:max-w-28 truncate">
      <Image src={user.image} alt={user.name} width={32} height={32} />
      <span className="text-secondary-800 text-xs max-w-40 truncate font-medium">
        {user.name}
      </span>
    </div>
  );
}
function TypeCell({ row }: CellContext<Appointment, unknown>) {
  const { type } = row.original;
  return <span className="text-secondary-800 text-xs font-medium">{type}</span>;
}
function TimeCell({ row }: CellContext<Appointment, unknown>) {
  const { time } = row.original;
  const locale = useLocale();
  return (
    <span
      suppressHydrationWarning
      className="text-secondary-800 text-xs font-medium"
    >
      {time.toLocaleDateString(locale, {
        day: "numeric",
        weekday: "long",
        month: "long",
        year: "numeric",
      })}
    </span>
  );
}
export const data: Appointment[] = [
  {
    id: "1",
    user: {
      name: "Ahmeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "2",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "3",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "4",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "5",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "6",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "7",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "8",
    user: {
      name: "Ahmed",
      image: "/avatar.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
];

function HeaderCell({ header }: HeaderContext<Appointment, unknown>) {
  const t = useTranslations("appointmentsTable.header");
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
