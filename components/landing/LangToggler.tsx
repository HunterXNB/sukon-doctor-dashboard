"use client";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

function LangToggler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  return (
    <Link
      className="flex gap-2 items-center group"
      href={`/${locale === "en" ? "ar" : "en"}/${pathname
        .split("/")
        .filter((p) => p !== "")
        .slice(1)
        .join("/")}${searchParams.toString() && `?${searchParams.toString()}`}`}
    >
      <Globe />
      <span className="text-primary group-hover:text-primary-700 transition-colors duration-300">
        {locale === "ar" ? "En" : "العربية"}
      </span>
    </Link>
  );
}

export default LangToggler;
