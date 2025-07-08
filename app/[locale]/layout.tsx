import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
// import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Toaster } from "sonner";
import TanStackQueryClientProvider from "@/components/Providers/QueryClientProvider";

// const IBM = IBM_Plex_Sans_Arabic({
//   subsets: ["arabic", "latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "metadata.homePage",
  });
  return {
    title: t("title"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <body className={`antialiased w-screen max-w-[100dvw] overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <TanStackQueryClientProvider>
            {children}
            <Toaster
              position={locale === "ar" ? "bottom-left" : "bottom-right"}
            />
          </TanStackQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
