import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سكون",
  description: "تطبيق الصحه النفسية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
