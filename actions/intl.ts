"use server";

import { getLocale as getLocaleIntl } from "next-intl/server";

export async function getLocale(): Promise<"ar" | "en"> {
  return (await getLocaleIntl()) as "ar" | "en";
}
