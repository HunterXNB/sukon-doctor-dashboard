import React from "react";
import { routing } from "@/i18n/routing";
import LoginPage from "@/components/login/LoginPage";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
async function DoctorLoginPage() {
  const cookieStore = await cookies();
  const mailToken = cookieStore.get("mail_token")?.value;
  let email: string = "";
  if (mailToken) {
    // cookieStore.delete("mail_token");
    try {
      const decoded = jwt.verify(
        mailToken,
        process.env.JWT_SECRET as string
      ) as { email: string };
      email = decoded.email;
    } catch {
      email = "";
    }
  }

  return <LoginPage fromRegister={!!email} storedEmail={email} />;
}

export default DoctorLoginPage;
