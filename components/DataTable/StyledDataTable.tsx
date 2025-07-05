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
// import TablePagination from "../TablePagination";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  children?: React.ReactNode;
}

export default function StyledDataTable<TData, TValue>({
  columns,
  data,
  children,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const locale = useLocale();
  const t = useTranslations("patientsList.table");
  return (
    <Table>
      <TableHeader className="bg-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-white">
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
          <>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="odd:bg-[#F9F9FC] even:bg-white"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {children ? (
              <TableRow className="odd:bg-[#F9F9FC] even:bg-white">
                <TableCell colSpan={columns.length}>{children}</TableCell>
              </TableRow>
            ) : null}
          </>
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

export function LoadingStyledDataTable<TData, TValue>({
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
          <TableHeader className="bg-white">
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
              <TableRow className="odd:bg-[#F9F9FC] even:bg-white" key={i}>
                {Array.from({ length: columns.length }, (_, i) => (
                  <TableCell key={i}>
                    <Skeleton className={cn("w-full h-5")} />
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
