import React from "react";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

const AfterServicesHero = async () => {
  const t = await getTranslations("landing.afterServicesHero");
  return (
    <section className="relative my-8">
      <MaxWidthWrapper>
        <div
          className="rounded-[32px] bg-primary-500 text-white px-4 py-10 pt-12 md:py-16 md:pt-20 md:px-12 w-full flex flex-col items-center text-center overflow-hidden"
          style={{
            backgroundImage: "url(/white-lines.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "400% 400%",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xs text-primary-50 md:text-base mb-2 opacity-80">
            {t("prompt")}
          </div>
          <h2 className="font-bold text-2xl md:text-4xl leading-snug mb-4">
            {t("headline")}
          </h2>
          <div className="text-xs md:text-base mb-6 opacity-80">
            {t("subheadline")}
          </div>
          <Button className="bg-[#8A8AA3] text-white font-semibold rounded-lg px-8 py-2 text-base md:text-lg hover:bg-[#8A8AA3]/80 transition">
            {t("button")}
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AfterServicesHero;
