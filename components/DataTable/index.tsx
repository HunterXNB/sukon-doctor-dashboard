"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const locale = useLocale();
  const t = useTranslations("table");
  return (
    <Table className="border-collapse no-scrollbar">
      <TableHeader className="bg-[#F6F6F6] [&_th:last-of-type]:rtl:rounded-l-[6px] [&_th:last-of-type]:ltr:rounded-r-[6px] [&_th:first-of-type]:rtl:rounded-r-[6px] [&_th:first-of-type]:ltr:rounded-l-[6px] hover:[&_tr]:bg-[#F6F6F6] rounded-[6px] overflow-hidden [&_th]:text-secondary-800 p-2.5 [&_tr]:border-none ">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className={cn("", {
                    "text-right": locale === "ar",
                  })}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {t("noResult")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function LoadingTable<TData, TValue>({
  columns,
}: Omit<DataTableProps<TData, TValue>, "data" | "meta">) {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const locale = useLocale();
  return (
    <>
      <div className="border rounded-md w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn("", {
                        "text-right": locale === "ar",
                      })}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }, (_, i) => (
              <TableRow key={i}>
                {Array.from({ length: columns.length }, (_, i) => (
                  <TableCell key={i}>
                    <Skeleton
                      className={cn("w-full h-[32px]", {
                        "size-8": columns[i].id === "actions",
                      })}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
