import React from "react";
import WaitingApprovalImg from "@/assets/waiting-approval.svg";
import Logo from "@/assets/logo.svg";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { getTranslations } from "next-intl/server";

async function ApprovalWaitingPage() {
  const t = await getTranslations("waitingApprovalPage");
  return (
    <div className="w-screen min-h-dvh relative flex items-center p-5 justify-center">
      <Link
        className="md:w-16 md:h-16 w-12 h-12 top-5 rtl:right-5 ltr:left-5 absolute md:top-10 md:rtl:right-10 md:ltr:left-10"
        href={"/"}
      >
        <Image src={Logo} alt="Sukon" />
      </Link>
      <div className="max-w-[500px] flex flex-col md:w-full w-[80%] gap-6">
        <div className="w-full max-w-[400px] mx-auto aspect-square relative">
          <Image src={WaitingApprovalImg} alt="waiting approval" fill />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-gray-800 font-bold md:text-2xl text-xl">
            {t("title")}
          </h1>
          <p className="text-gray-500 text-center">{t("description")}</p>
        </div>
        <form className="w-full contents" action={logout}>
          <Button variant={"destructive-extra"}>{t("logoutBtn")}</Button>
        </form>
      </div>
    </div>
  );
}

export default ApprovalWaitingPage;
