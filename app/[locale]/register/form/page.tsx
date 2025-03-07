import RegisterForm from "@/components/register/Form";
import React from "react";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
function RegisterFormPage() {
  return <RegisterForm />;
}

export default RegisterFormPage;
