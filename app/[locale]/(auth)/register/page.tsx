import RegisterHero from "@/components/register/RegisterHero";
import React from "react";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
function DoctorRegisterPage() {
  return <RegisterHero />;
}

export default DoctorRegisterPage;
