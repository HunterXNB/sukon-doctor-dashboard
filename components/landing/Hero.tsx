import React from "react";
import Header from "./Header";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import HeroIMG from "@/assets/hero-doctor.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

async function Hero() {
  const t = await getTranslations("landing.hero");
  return (
    <div className="px-6 lg:px-16 pt-4 lg:pt-6 bg-primary-50 min-h-dvh flex flex-col">
      <Header />
      <MaxWidthWrapper className="grid max-md:justify-items-center max-md:justify-center grid-cols-1 md:grid-cols-2 flex-1">
        <div className=" @container max-md:text-center w-full space-y-11 self-center max-w-[600px]">
          <div>
            <h1 className="font-semibold text-[clamp(16px,11cqi,64px)]">
              {t.rich("title", {
                span: (c) => <span className="text-primary">{c}</span>,
              })}
            </h1>
            <p>
              {t.rich("description", {
                span: (c) => <span className="text-primary">{c}</span>,
              })}
            </p>
          </div>
          <div className="flex max-md:justify-center gap-6 lg:gap-12 pb-4">
            <Button className="text-2xl px-5 py-[6px]">{t("start")}</Button>
            <Button
              variant={"outline"}
              className="text-2xl bg-transparent  px-5 py-[6px]"
            >
              {t("contact")}
            </Button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image
            src={HeroIMG}
            className="object-cover ltr:-scale-x-100"
            fill
            alt="Sukon"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Hero;
