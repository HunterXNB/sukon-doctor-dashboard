// components/multi-step-form.tsx
"use client";
import { useFormContext } from "react-hook-form";
import React, { startTransition, useActionState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Step1 from "./Step1";
import Steps from "./Steps";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { RegisterFormValues } from "@/schemas/register";
import StepperContextProvider, {
  useStepper,
} from "@/context/Register/StepperContext";
import RegisterFormContextProvider from "@/context/Register/FormContext";
import Step5 from "./Step5";
// import { register } from "@/actions/auth";
import { useFormServerError } from "@/hooks/useFormServerError";
import { register } from "@/actions/auth";
import { Link, useRouter } from "@/i18n/routing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileSteps from "./MobileSteps";

// stepper context creation

export const fieldToStepMap: Record<keyof RegisterFormValues, number> = {
  country_of_residence: 1,
  date_of_birth: 1,
  email: 1,
  first_name: 1,
  gender: 1,
  fluent_language: 1,
  mobile: 1,
  nationality: 1,
  last_name: 1,
  title: 1,
  graduation_year: 2,
  highest_degree: 2,
  university: 2,
  role_id: 3,
  licensing_number: 3,
  licensing_area: 3,
  number_of_years_of_experience: 3,
  specifications: 3,
  work_on_clinic: 3,
  certificates: 4,
  cv: 4,
  has_more_than_one_qualification: 4,
};
export const stepToFieldMap: Record<number, (keyof RegisterFormValues)[]> = {
  1: [
    "country_of_residence",
    "date_of_birth",
    "email",
    "first_name",
    "gender",
    "fluent_language",
    "mobile",
    "nationality",
    "last_name",
    "title",
  ],
  2: ["graduation_year", "highest_degree", "university"],
  3: [
    "role_id",
    "specifications",
    "licensing_number",
    "licensing_area",
    "number_of_years_of_experience",
    "work_on_clinic",
  ],
  4: ["cv", "has_more_than_one_qualification", "certificates"],
};

// Form Provider
const RegisterForm = React.memo(function RegisterForm() {
  return (
    <RegisterFormContextProvider>
      <StepperContextProvider>
        <Form />
      </StepperContextProvider>
    </RegisterFormContextProvider>
  );
});
const Form = () => {
  const showLargeSteps = useMediaQuery("(min-width: 768px)");
  const t = useTranslations("registerPage.form.footer");
  const methods = useFormContext<RegisterFormValues>();
  const { handleSubmit } = methods;
  const { step, setStep } = useStepper();
  const [state, action, isPending] = useActionState(register, undefined);
  const router = useRouter();
  useEffect(() => {
    if (state && "error" in state) {
      if (state.error.type === "validation") {
        const fields = state.error.fields;
        for (const field of stepToFieldMap[1]) {
          if (fields.hasOwnProperty(field)) return setStep(1);
        }
        for (const field of stepToFieldMap[2]) {
          if (fields.hasOwnProperty(field)) return setStep(2);
        }
        for (const field of stepToFieldMap[3]) {
          if (fields.hasOwnProperty(field)) return setStep(3);
        }
        for (const field of stepToFieldMap[4]) {
          if (fields.hasOwnProperty(field)) return setStep(4);
        }
      }
    }
  }, [state, setStep]);
  useEffect(() => {
    if (state && "success" in state) {
      localStorage.removeItem("form_values");
      localStorage.removeItem("form_step");
      router.push("/");
    }
  }, [state, setStep, router]);
  useFormServerError(methods, state);
  const onSubmit = async ({
    cv,
    certificates,
    specifications,
    ...data
  }: RegisterFormValues) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(
        key,
        data[
          key as keyof Omit<
            RegisterFormValues,
            "cv" | "certificates" | "specifications"
          >
        ]
      );
    }
    formData.set("cv", cv[0]);
    for (const i in certificates) {
      formData.set(`certificates[${i}]`, certificates[i]);
    }
    specifications.forEach((specification, i) =>
      formData.set(
        `specialization_ids[${i}]`,
        specification.value?.toString?.()
      )
    );
    formData.set("qualifications", "bla bla bla");
    formData.set("clinic_address", "bla bla bla");

    startTransition(async () => {
      await action(formData);
    });
  };

  return (
    <div className="flex p-10 flex-col md:flex-row min-h-screen ">
      {showLargeSteps ? <Steps /> : <MobileSteps />}
      <div className="flex-1 h-fit">
        <Card className="w-full border-none p-[32px] shadow-[0_0_24px_0_rgba(0,0,0,.04)] h-full">
          <CardContent className="p-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                {step === 1 && <Step1 state={state} />}
                {step === 2 && <Step2 state={state} />}
                {step === 3 && <Step3 state={state} />}
                {step === 4 && <Step4 state={state} />}
                {step === 5 && <Step5 isPending={isPending} state={state} />}
              </div>
            </form>
          </CardContent>
        </Card>
        <p className="text-center mt-4">
          {t.rich("text", {
            a: (c) => (
              <Button
                variant={"link"}
                asChild
                className="text-sm underline-offset-1 p-0 m-0"
              >
                <Link href={"/"}>{c}</Link>
              </Button>
            ),
          })}
        </p>
      </div>
    </div>
  );
};
export default RegisterForm;
