import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Star } from "lucide-react";
import Image from "next/image";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import { getTranslations } from "next-intl/server";
import { getLocale } from "@/actions/intl";

const TestimonialsCarousel = async () => {
  const t = await getTranslations("landing.testimonials");
  const testimonials = t.raw("items") as Array<{
    name: string;
    date: string;
    avatar: string;
    rating: number;
    text: string;
  }>;
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <section className="py-12 md:py-20 w-screen overflow-x-hidden">
      <MaxWidthWrapper>
        <div className="text-center mb-6">
          <h2 className="text-primary text-2xl md:text-3xl font-semibold mb-2">
            {t("title")}
          </h2>
          <div className="text-black text-sm md:text-base">{t("subtitle")}</div>
        </div>
        <div className="relative w-full">
          <Carousel dir={dir} className="mx-auto w-fit">
            <CarouselContent className="w-full mx-auto ">
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx} className="flex justify-center w-full ">
                  <div className="border rounded-xl p-6 md:p-8 w-full max-w-xl bg-white flex flex-col items-center text-center min-h-[220px]">
                    <div className="flex w-full justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={58}
                          height={58}
                          className="rounded-full object-cover size-10 md:size-14"
                        />
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="font-semibold text-sm md:text-base truncate">
                            {t.name}
                          </span>
                          <div className="text-xs text-muted-foreground truncate">
                            {t.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-yellow-400 fill-yellow-400 w-5 h-5"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm md:text-base leading-relaxed text-[#5A5A5A] w-full text-start mt-2">
                      {t.text}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute  border-[#2E2E2E] text-[#2E2E2E]  size-6 md:size-10  ltr:-left-3 md:ltr:-left-0 rtl:-right-3 md:rtl:-right-0 rtl:rotate-180" />
            <CarouselNext className="absolute  border-[#2E2E2E] text-[#2E2E2E]  size-6 md:size-10 ltr:-right-3 md:ltr:-right-0 rtl:-left-3 md:rtl:left-0  rtl:rotate-180" />
          </Carousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TestimonialsCarousel;
