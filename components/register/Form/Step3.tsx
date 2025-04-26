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
import { Input } from "@/components/ui/input";
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
import { RegisterFormValues, step3RegisterSchema } from "@/schemas/register";
import { useStepper } from "@/context/Register/StepperContext";
import { register } from "@/actions/auth";
import { useLocale, useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";
const Step3 = ({
  state,
}: {
  state: Awaited<ReturnType<typeof register>> | undefined;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { watch, ...form } = useFormContext<RegisterFormValues>();
  const locale = useLocale();
  const { nextStep, prevStep } = useStepper();
  const watchedFields = watch(stepToFieldMap[3]);
  const [isStepValid, setIsStepValid] = useState(false);
  const t = useTranslations("registerPage.form.step4");
  useEffect(() => {
    async function validateStep() {
      try {
        const schema = step3RegisterSchema;
        // @ts-expect-error - just to skip type checking
        const formValues = watchedFields.reduce(
          (acc: Record<keyof RegisterFormValues, unknown>, val, i) => {
            acc[stepToFieldMap[3][i]] = val;
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
        <div className="flex *:min-w-56 flex-wrap *:flex-1 justify-between gap-[25px]">
          <FormField
            control={form.control}
            name="classification"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("classification.label")}
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
                            {t("classification.placeholder")}
                          </SelectPlaceholder>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="doctor">
                      {t("classification.doctor")}
                    </SelectItem>
                    <SelectItem value="therapist">
                      {t("classification.therapist")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="specification"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("specification")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("specification_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between *:flex-1 gap-4">
          <FormField
            control={form.control}
            name="number_of_years_of_experience"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("years_of_exp")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    placeholder={t("years_of_exp_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-4 *:flex-1">
          <FormField
            control={form.control}
            name="licensing_number"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("license_no")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("license_no_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-4 *:flex-1">
          <FormField
            control={form.control}
            name="licensing_area"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("license_org")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("license_org_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex *:flex-1 justify-between gap-[25px]">
          <FormField
            control={form.control}
            name="work_on_clinic"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("work_on_clinic.label")}
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
                            {t("work_on_clinic.placeholder")}
                          </SelectPlaceholder>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">{t("work_on_clinic.1")}</SelectItem>
                    <SelectItem value="0">{t("work_on_clinic.0")}</SelectItem>
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
          {t("next")} <ArrowLeft className="ltr:-scale-100" />
        </Button>
      </div>
      {/* </Form> */}
    </div>
  );
};

export default Step3;
