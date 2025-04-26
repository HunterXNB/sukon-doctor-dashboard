"use client";
import Image from "next/image";
import React from "react";
import Doctor from "@/assets/handsome-doctor.png";
import { useTranslations } from "next-intl";
function HeroImage() {
  const t = useTranslations("registerPage.hero");
  return (
    <div className="min-[850px]:flex-1 max-[850px]:px-10 max-[850px]:py-8">
      {" "}
      <div className="@container-[size] py-20 px-9 relative min-[850px]:min-h-dvh max-[850px]:h-[calc(100dvh-4rem)] max-[850px]:rounded-lg max-[850px]:max-w-[590px] max-[850px]:mx-auto min-[850px]:rtl:rounded-r-[40px] min-[850px]:ltr:rounded-l-[40px] flex justify-end flex-col overflow-hidden">
        <Image
          src={Doctor}
          fill
          alt="Handsome doctor"
          className="pointer-events-none object-cover object-top select-none"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-primary"></div>
        <div className="relative text-[clamp(16px,8cqi,48px)] text-white text-5xl font-bold leading-normal">
          {t("text")}
        </div>
      </div>
    </div>
  );
}

export default HeroImage;
