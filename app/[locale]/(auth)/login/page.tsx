import React from "react";
import { routing } from "@/i18n/routing";
import LoginPage from "@/components/login/LoginPage";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
function DoctorLoginPage() {
  return <LoginPage />;
}

export default DoctorLoginPage;
