"use client";
import React, { useEffect, useRef } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";

import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTranslations } from "next-intl";
interface TableSearchProps {
  placeholder?: string;
}
function TableSearch({ placeholder }: TableSearchProps) {
  const t = useTranslations("tableSearch");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const pathname = usePathname();
  const router = useRouter();
  const search = useDebouncedCallback((value: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("search", value);
    urlSearchParams.delete("page");
    router.replace(`${pathname}?${urlSearchParams}`);
  }, 800);
  const resetSearch = () => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("search");
    urlSearchParams.delete("page");
    return urlSearchParams;
  };
  useEffect(() => {
    if (inputRef.current && !searchTerm) inputRef.current.value = "";
  }, [searchTerm]);
  return (
    <div className="w-fit flex relative max-w-52 h-10 p-1 items-center gap-1 bg-white rounded-lg border border-gray-100 has-[#table-search:focus-visible]:ring-1 has-[#table-search:focus-visible]:ring-primary-500">
      <Label htmlFor="table-search">
        <Search className="w-5 h-5 text-gray-400" />
      </Label>
      <Input
        id="table-search"
        placeholder={placeholder || t("placeholder")}
        ref={inputRef}
        defaultValue={searchTerm || undefined}
        onChange={(e) => search(e.target.value)}
        className="h-full w-full outline-none border-none bg-transparent text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
      />
      {searchTerm && (
        <Link
          className="absolute top-1/2 -translate-y-1/2 self-end ltr:-translate-x-2 ltr:right-0 rtl:translate-x-2 rtl:left-0 text-gray-400 hover:text-destructive"
          tabIndex={-1}
          prefetch
          href={`${pathname}?${resetSearch()}`}
        >
          <X />
        </Link>
      )}
    </div>
  );
}

export default TableSearch;
