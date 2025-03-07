"use client";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import SukonSVG from "@/assets/sukon.svg";
import { useTranslations } from "next-intl";
import { stepToFieldMap } from ".";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Link } from "@/i18n/routing";
import { useStepper } from "@/context/Register/StepperContext";
import { RegisterFormValues } from "@/schemas/register";

function Steps() {
  const t = useTranslations("registerPage.form.stepper");
  const { step, setStep } = useStepper();
  const form = useFormContext<RegisterFormValues>();
  return (
    <div className="self-start sticky top-3 h-fit">
      <div className="mb-5">
        <Link href={"/"}>
          <Image src={SukonSVG} alt="sukon" />
        </Link>
      </div>
      <ul className="flex flex-col gap-1">
        {[t("step1"), t("step2"), t("step3"), t("step4"), t("step5")].map(
          (el, i) => (
            <li
              onClick={async () => {
                if (i + 1 < step) return setStep(i + 1);
                const fields: (keyof RegisterFormValues)[] = [];
                for (let j = 1; j <= i; j++) {
                  fields.push(
                    ...stepToFieldMap[j as keyof typeof stepToFieldMap]
                  );
                }
                const isValid = await form.trigger(fields);
                if (!isValid) return;
                setStep(i + 1);
              }}
              className={cn(
                "flex items-center hover:bg-muted/10 transition-colors duration-300 gap-3 px-6 py-5 cursor-pointer relative rounded-r-md w-full"
              )}
              key={i}
            >
              <span
                className={cn(
                  "rounded-full size-6 flex items-center border border-[#f7f7f8] justify-center",
                  {
                    "bg-[#14a5f8] text-white border-2 border-[#14a5f8]":
                      step === i + 1,
                  }
                )}
              >
                {i + 1}
              </span>
              <p
                className={cn({
                  "text-[#14a5f8]": step === i + 1,
                })}
              >
                {el}
              </p>
              {step === i + 1 && (
                <motion.div
                  layoutId="current_step"
                  className="absolute inset-0 rounded-r-md bg-[#f0f8ff] -z-[1]"
                />
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Steps;
