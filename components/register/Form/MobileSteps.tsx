"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SukonSVG from "@/assets/sukon.svg";
import RoundedStepper from "@/components/shared/RoundStepper";
import { useStepper } from "@/context/Register/StepperContext";
import { useTranslations } from "next-intl";

function MobileSteps() {
  const { step } = useStepper();
  const t = useTranslations(`registerPage.form.step${step + 1}`);
  return (
    <div className="mb-5">
      <div className="mb-5">
        <Link href={"/"}>
          <Image src={SukonSVG} alt="sukon" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <RoundedStepper
          className="w-20 min-w-20 min-h-20 h-20 text-sm"
          value={step}
          maxStep={5}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-[#1d1f1f] text-lg font-bold">{t("title")}</h2>
          <p className="text-[#666666] text-sm">{t("description")}</p>
        </div>
      </div>
    </div>
  );
}

export default MobileSteps;
