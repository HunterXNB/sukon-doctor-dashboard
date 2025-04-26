import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2 } from "lucide-react";
import { RegisterFormValues } from "@/schemas/register";
import { useStepper } from "@/context/Register/StepperContext";
import { register } from "@/actions/auth";
import { useLocale, useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Step5 = ({
  isPending,
  state,
}: {
  isPending: boolean;
  state: Awaited<ReturnType<typeof register>> | undefined;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { getValues } = useFormContext<RegisterFormValues>();
  const locale = useLocale();
  const [formValues] = useState(() => getValues());
  const { prevStep } = useStepper();
  const t = useTranslations("registerPage.form.step6");
  const t1 = useTranslations("registerPage.form.step2");
  const t2 = useTranslations("registerPage.form.step3");
  const t3 = useTranslations("registerPage.form.step4");
  const t4 = useTranslations("registerPage.form.step5");
  return (
    <div className="max-w-full">
      {isDesktop && (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="text-[#1d1f1f] text-2xl font-bold">{t("title")}</h2>
            <p className="text-[#666666] ">{t("description")}</p>
          </div>
          <Separator className="mt-4 mb-6 bg-[#f7f7f8] h-[2px]" />
        </>
      )}

      <div className="space-y-6">
        <h2 className="font-bold col-span-full">{t("step1_title")}</h2>
        <div className="grid *:overflow-hidden *:truncate gap-x-2 grid-cols-1 gap-y-5 justify-between md:grid-cols-2 lg:grid-cols-3">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("title_input")}: </span>
            {formValues.title}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("first_name")}: </span>
            {formValues.first_name}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("last_name")}: </span>
            {formValues.last_name}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("mobile")}: </span>
            {formValues.mobile}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("email")}: </span>
            {formValues.email}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("date_of_birth")}: </span>
            {formValues.date_of_birth}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("language")}: </span>
            {t1(formValues.fluent_language)}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("gender.label")}: </span>
            {t1(`gender.${formValues.gender}`)}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("nationality")}: </span>
            {formValues.nationality}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t1("country_of_residence")}: </span>
            {formValues.country_of_residence}
          </p>
        </div>
      </div>
      <Separator className="mt-[32px] mb-6 bg-[#f7f7f8] h-[2px]" />
      <div className="space-y-6">
        <h2 className="font-bold col-span-full">{t("step2_title")}</h2>
        <div className="grid *:overflow-hidden *:truncate gap-x-2 grid-cols-1 gap-y-5 justify-between md:grid-cols-2 lg:grid-cols-3">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t2("university")}: </span>
            {formValues.university}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t2("academic_degree.label")}: </span>
            {t2(`academic_degree.${formValues.highest_degree}`)}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t2("grad_year")}: </span>
            {formValues.graduation_year}
          </p>
        </div>
      </div>
      <Separator className="mt-[32px] mb-6 bg-[#f7f7f8] h-[2px]" />
      <div className="space-y-6">
        <h2 className="font-bold col-span-full">{t("step3_title")}</h2>
        <div className="grid *:overflow-hidden *:truncate gap-x-2 grid-cols-1 gap-y-5 justify-between md:grid-cols-2 lg:grid-cols-3">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t3("years_of_exp")}: </span>
            {formValues.number_of_years_of_experience}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t3("classification.label")}: </span>
            {t3(`classification.${formValues.classification}`)}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t3("specification")}: </span>
            {formValues.specification}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t3("work_on_clinic.label")}: </span>
            {t3(`work_on_clinic.${formValues.work_on_clinic}`)}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t3("license_org")}: </span>
            {formValues.licensing_area}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">{t3("license_no")}: </span>
            {formValues.licensing_number}
          </p>
        </div>
      </div>
      <Separator className="mt-[32px] mb-6 bg-[#f7f7f8] h-[2px]" />
      <div className="space-y-6">
        <h2 className="font-bold col-span-full"> {t("step4_title")}</h2>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="font-bold">{t4("cv.label")}</p>
            <p className="overflow-hidden truncate max-w-full">
              {formValues?.cv[0]?.name}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">{t4("certificates.label")}</p>
            <ul className="flex flex-col gap-2 px-1">
              {formValues.certificates.map((certificate) => (
                <li
                  className="overflow-hidden truncate max-w-full"
                  key={certificate.name}
                >
                  {certificate.name}
                </li>
              ))}
            </ul>
          </div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold">
              {t4("num_of_qualifications.label")}:{" "}
            </span>
            {t4(
              `num_of_qualifications.${formValues.has_more_than_one_qualification}`
            )}
          </p>
        </div>
      </div>
      {state?.locale === locale &&
        "error" in state &&
        state.error.type === "global" && (
          <p className="text-destructive">{state.error.message}</p>
        )}
      <div className="flex rtl:mr-auto mt-5 ltr:ml-auto w-fit gap-4">
        <Button
          type="button"
          variant={"outline"}
          onClick={prevStep}
          className=" w-fit"
        >
          {t("prev")}
        </Button>
        <Button
          disabled={isPending || (state && "success" in state)}
          type="submit"
          className="flex gap-5 w-fit"
        >
          {isPending || (state && "success" in state) ? (
            <>
              {t("loading")}
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              {" "}
              {t("send")}
              <ArrowLeft className="ltr:-scale-100" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step5;
