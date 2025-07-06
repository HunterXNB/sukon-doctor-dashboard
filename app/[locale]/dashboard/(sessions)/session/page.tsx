import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

async function SessionPage() {
  const locale = await getLocale();
  return redirect({ href: "/dashboard", locale });
}

export default SessionPage;
