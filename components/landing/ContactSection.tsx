import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { MaxWidthWrapper } from "../shared/MaxWidthWrapper";
import { Input } from "../ui/input";
import { getTranslations } from "next-intl/server";

export default async function ContactSection() {
  const t = await getTranslations("landing.contact");
  return (
    <section className="py-12 md:py-20">
      <MaxWidthWrapper>
        <div className=" rounded-[32px] bg-[#8A8AA3] flex items-stretch overflow-hidden">
          {/* Info */}
          <div className="flex-1 flex flex-col gap-4 p-4 md:p-12 text-white">
            <div className="text-xs md:text-sm mb-2 md:mb-4 self-start">
              {t("prompt")}
            </div>
            <h2 className="text-base md:text-2xl font-bold mb-2 md:mb-4">
              {t("heading")}
            </h2>
            <Image
              src="/trimmed-logo.svg"
              alt="Logo"
              width={60}
              height={60}
              className="mb-4 size-10 md:size-14"
            />
            <div className="flex items-center gap-6 mt-auto">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <Image
                  src="/avatar.svg"
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white min-w-9"
                />
                <Image
                  src="/avatar-rect.svg"
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white min-w-9"
                />
              </div>
              <span className="text-[9px] md:text-sm">{t("doctorsNote")}</span>
            </div>
          </div>
          {/* Form */}
          <form className="flex-1 flex flex-col gap-4 p-4 md:p-12">
            <Input
              type="text"
              placeholder={t("namePlaceholder")}
              className="rounded-lg px-4 py-3 bg-white placeholder:text-[#8A8AA3] text-black focus:outline-none"
            />
            <Input
              type="text"
              placeholder={t("phonePlaceholder")}
              className="rounded-lg px-4 py-3 bg-white placeholder:text-[#8A8AA3] text-black focus:outline-none"
            />
            <Input
              type="text"
              placeholder={t("messagePlaceholder")}
              className="rounded-lg px-4 py-3 bg-white placeholder:text-[#8A8AA3] text-black focus:outline-none"
            />
            <Button
              type="submit"
              className="bg-primary text-white font-bold rounded-lg mt-2 w-fit px-8 mx-auto"
            >
              {t("button")}
            </Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
