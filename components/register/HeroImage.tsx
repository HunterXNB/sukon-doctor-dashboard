"use client";
import Image from "next/image";
import React from "react";
import Doctor from "@/assets/handsome-doctor.png";
import { useTranslations } from "next-intl";
function HeroImage() {
  const t = useTranslations("registerPage.hero");
  return (
    <div className="min-[850px]:flex-1 py-20 px-9 relative min-h-dvh min-[850px]:rtl:rounded-r-[40px] min-[850px]:ltr:rounded-l-[40px] flex justify-end flex-col overflow-hidden">
      <Image
        src={Doctor}
        fill
        alt="Handsome doctor"
        className="pointer-events-none object-cover object-top select-none"
        quality={75}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-primary"></div>
      <div className="relative text-white text-5xl font-bold leading-normal">
        {t("text")}
      </div>
    </div>
  );
}

export default HeroImage;
