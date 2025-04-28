import React from "react";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import { getTranslations } from "next-intl/server";

async function Stats() {
  const t = await getTranslations("landing.stats");
  return (
    <section className="py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="grid justify-between md:gap-x-[30px] grid-cols-2 gap-x-[45px] gap-y-[35px] *:text-center md:grid-cols-4 ">
          <div className="odd:bg-primary text-primary-foreground even:bg-secondary-400 even:text-secondary-foreground rounded-[20px] space-y-4 py-12">
            <div dir="ltr" className="md:text-5xl text-2xl font-bold">
              24/7
            </div>
            <p>{t("internetSupport")}</p>
          </div>
          <div className="odd:bg-primary text-primary-foreground even:bg-secondary-400 even:text-secondary-foreground rounded-[20px] space-y-4 py-12">
            <div dir="ltr" className="md:text-5xl text-2xl font-bold">
              100+
            </div>
            <p>{t("doctors")}</p>
          </div>
          <div className="odd:bg-primary text-primary-foreground even:bg-secondary-400 even:text-secondary-foreground rounded-[20px] space-y-4 py-12">
            <div dir="ltr" className="md:text-5xl text-2xl font-bold">
              1M+
            </div>
            <p>{t("active")}</p>
          </div>
          <div className="odd:bg-primary text-primary-foreground even:bg-secondary-400 even:text-secondary-foreground rounded-[20px] space-y-4 py-12">
            <div dir="ltr" className="md:text-5xl text-2xl font-bold">
              5M+
            </div>
            <p>{t("interested")}</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Stats;
