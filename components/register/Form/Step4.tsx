import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { stepToFieldMap } from ".";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import CVInput from "./CVInput";
import CertificatesInput from "./CertificatesInput";
import { RegisterFormValues, step4RegisterSchema } from "@/schemas/register";
import { useStepper } from "@/context/Register/StepperContext";
import { register } from "@/actions/auth";
import { useLocale, useTranslations } from "next-intl";
const Step4 = ({
  state,
}: {
  state: Awaited<ReturnType<typeof register>> | undefined;
}) => {
  const { watch, ...form } = useFormContext<RegisterFormValues>();
  const { nextStep, prevStep } = useStepper();
  const locale = useLocale();
  const watchedFields = watch(stepToFieldMap[4]);
  const [isStepValid, setIsStepValid] = useState(false);
  const t = useTranslations("registerPage.form.step5");
  useEffect(() => {
    async function validateStep() {
      try {
        const schema = step4RegisterSchema;
        // @ts-expect-error - just to skip type checking
        const formValues = watchedFields.reduce(
          (acc: Record<keyof RegisterFormValues, unknown>, val, i) => {
            acc[stepToFieldMap[4][i]] = val;
            return acc;
          },
          {}
        );
        await schema.parse(formValues);
        setIsStepValid(true);
      } catch (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        err
      ) {
        setIsStepValid(false);
      }
    }
    validateStep();
  }, [watchedFields]);
  return (
    <div className="max-w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-[#1d1f1f] text-2xl font-bold">{t("title")}</h2>
        <p className="text-[#666666] ">{t("description")}</p>
      </div>
      <Separator className="mt-4 mb-6 bg-[#f7f7f8] h-[2px]" />
      {/* <Form {...form}> */}
      <div className="space-y-6">
        <CVInput />
        <CertificatesInput />
        <div className="flex *:flex-1 justify-between gap-[25px]">
          <FormField
            control={form.control}
            name="has_more_than_one_qualification"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("num_of_qualifications.label")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          <SelectPlaceholder>
                            {t("num_of_qualifications.placeholder")}
                          </SelectPlaceholder>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">
                      {t("num_of_qualifications.1")}
                    </SelectItem>
                    <SelectItem value="0">
                      {t("num_of_qualifications.0")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
          type="button"
          onClick={() => nextStep()}
          className="flex gap-5 w-fit"
          disabled={!isStepValid}
        >
          {t("next")}
          <ArrowLeft className="ltr:-scale-100" />
        </Button>
      </div>
      {/* </Form> */}
    </div>
  );
};

export default Step4;
