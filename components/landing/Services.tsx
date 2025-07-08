import React from "react";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import ServiceCard from "./ServiceCard";
import { getTranslations } from "next-intl/server";

async function Services() {
  const t = await getTranslations("landing.services");
  const cards = t.raw("cards") as Array<{ title: string; description: string }>;

  return (
    <section className="py-12 md:py-20">
      <MaxWidthWrapper className="space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-2 text-center">
          <h2 className="md:text-4xl text-2xl  font-semibold text-primary">
            {t("title")}
          </h2>
          <p className="max-w-[300px] mx-auto">{t("subtitle")}</p>
        </div>
        {/* Main grid: 3 columns, 2 rows, always. Each card is a grid item. */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-8">
          {cards.map((card, idx) => (
            <ServiceCard
              key={idx}
              icon={`/service-${idx + 1}.svg`}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Services;
