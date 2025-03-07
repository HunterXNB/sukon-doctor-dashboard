"use client";
import React from "react";
import HeroImage from "./HeroImage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import SukonSVG from "@/assets/sukon.svg";
import { Link } from "@/i18n/routing";

function RegisterHero() {
  const t = useTranslations("registerPage.form.step1");

  return (
    <div className="flex max-[850px]:flex-col-reverse min-h-dvh">
      <div className="min-[850px]:flex-1 min-h-dvh  flex justify-center py-10 px-8 items-center">
        <Card className="max-w-[590px] p-2 w-full">
          <CardHeader className="p-2">
            <Image src={SukonSVG} alt="sukon" />
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2">
              <div className="space-y-1">
                <h2 className="text-[#1d1f1f] text-xl font-bold">
                  {t("title")}
                </h2>
                <p className="text-[#666666] text-sm">{t("description")}</p>
              </div>
              <dl>
                <dt className="text-[#1d1f1f]  font-semibold leading-snug">
                  {t("psychiatrist.title")}
                </dt>
                <dd>
                  <ol className="list-decimal list-inside px-1 text-[#55556d] text-sm font-normal leading-snug">
                    {Array.from({ length: 4 }, (_, i) => (
                      <li key={i}>{t(`psychiatrist.req${i + 1}`)}</li>
                    ))}
                  </ol>
                </dd>
                <dt className="text-[#1d1f1f] font-semibold leading-snug">
                  {t("psychologist.title")}
                </dt>
                <dd>
                  <ol className="list-decimal list-inside px-1 text-[#55556d] text-sm font-normal leading-snug">
                    {Array.from({ length: 3 }, (_, i) => (
                      <li key={i}>{t(`psychologist.req${i + 1}`)}</li>
                    ))}
                  </ol>
                </dd>
                <dt className="text-[#1d1f1f] font-semibold leading-snug">
                  {t("counselor.title")}
                </dt>
                <dd>
                  <ol className="list-decimal list-inside px-1 text-[#55556d] text-sm font-normal leading-snug">
                    {Array.from({ length: 3 }, (_, i) => (
                      <li key={i}>{t(`counselor.req${i + 1}`)}</li>
                    ))}
                  </ol>
                </dd>
              </dl>
              <Button type="button" asChild className="flex w-full">
                <Link href={"/register/form"}>
                  {t("btn")} <ArrowLeft className="ltr:-scale-100" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <HeroImage />
    </div>
  );
}

export default RegisterHero;
