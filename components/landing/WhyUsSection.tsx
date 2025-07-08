import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import { getTranslations } from "next-intl/server";

const WhyUsSection = async () => {
  const t = await getTranslations("landing.whyUs");
  const features = t.raw("features") as Array<{ title: string; desc: string }>;

  return (
    <section className="py-12 md:py-20">
      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-primary text-2xl md:text-3xl font-semibold mb-2">
            {t("title")}
          </h2>
          <p className="text-black text-sm text-center w-[60%] min-w-60 mx-auto md:text-base">
            {t("description")}
          </p>
        </div>
        <div className="max-w-6xl mx-auto flex items-stretch gap-8 md:gap-16">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex flex-col justify-between w-full flex-1 gap-4">
              {features.map((f, idx) => (
                <div
                  className=" relative before:content-[''] before:absolute before:bg-black before:w-1 before:rounded-full before:max-md:h-8 before:top-0 md:before:bottom-0 rtl:before:right-0 ltr:before:left-0 rtl:pr-2 ltr:pl-2"
                  key={idx}
                >
                  <div className="text-primary font-semibold text-base mb-1 flex items-center gap-2">
                    {f.title}
                    <span className="mt-1">
                      <CheckCircle className="text-primary w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-[#5A5A5A] text-sm md:text-base leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 justify-center hidden md:flex">
            <Image
              src="/why-you-need-us.png"
              alt="Why you need us"
              width={500}
              height={400}
              className="rounded-2xl object-cover w-full max-w-[400px] md:max-w-full"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default WhyUsSection;
