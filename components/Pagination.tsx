"use client";

import type React from "react";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import type { ResponseMeta } from "@/types/response-meta";
import { useTranslations } from "next-intl";

interface PaginationProps {
  meta: ResponseMeta;
}

export function Pagination({ meta }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("pagination");
  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const renderPaginationItems = () => {
    const { current_page, last_page } = meta;
    const items: React.JSX.Element[] = [];

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateToPage(1);
          }}
          isActive={current_page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if there's a gap between first page and current page range
    if (current_page > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <PaginationEllipsis />
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show previous page if it's not 1 and not already shown
    if (current_page > 2) {
      const prevPage = current_page - 1;
      items.push(
        <PaginationItem key={prevPage}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(prevPage);
            }}
          >
            {prevPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show current page if it's not 1 or last page
    if (current_page !== 1 && current_page !== last_page) {
      items.push(
        <PaginationItem key={current_page}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(current_page);
            }}
            isActive={true}
          >
            {current_page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show next page if it's not the last page and not already shown
    if (current_page < last_page - 1) {
      const nextPage = current_page + 1;
      items.push(
        <PaginationItem key={nextPage}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(nextPage);
            }}
          >
            {nextPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if there's a gap between current page range and last page
    if (current_page < last_page - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <PaginationEllipsis />
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Always show last page if it's not the same as first page
    if (last_page > 1) {
      items.push(
        <PaginationItem key={last_page}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(last_page);
            }}
            isActive={current_page === last_page}
          >
            {last_page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="text-sm text-nowrap whitespace-nowrap text-muted-foreground">
        {t("view", {
          from: meta.from,
          to: meta.to,
          total: meta.total,
        })}
      </div>

      <ShadcnPagination dir="ltr">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (meta.current_page > 1) {
                  navigateToPage(meta.current_page - 1);
                }
              }}
              className={
                meta.current_page <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {renderPaginationItems()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (meta.current_page < meta.last_page) {
                  navigateToPage(meta.current_page + 1);
                }
              }}
              className={
                meta.current_page >= meta.last_page
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
}
