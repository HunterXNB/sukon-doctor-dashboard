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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RegisterFormValues, step2RegisterSchema } from "@/schemas/register";
import { useStepper } from "@/context/Register/StepperContext";
import { useLocale, useTranslations } from "next-intl";
import { register } from "@/actions/auth";
const Step2 = ({
  state,
}: {
  state: Awaited<ReturnType<typeof register>> | undefined;
}) => {
  const { watch, ...form } = useFormContext<RegisterFormValues>();
  const locale = useLocale();
  const { nextStep, prevStep } = useStepper();
  const watchedFields = watch(stepToFieldMap[2]);
  const [isStepValid, setIsStepValid] = useState(false);
  const t = useTranslations("registerPage.form.step3");
  useEffect(() => {
    async function validateStep() {
      try {
        const schema = step2RegisterSchema;
        // @ts-expect-error - just to skip type checking
        const formValues = watchedFields.reduce(
          (acc: Record<keyof RegisterFormValues, unknown>, val, i) => {
            acc[stepToFieldMap[2][i]] = val;
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
        <p className="text-[#666666] ">{t("description")} </p>
      </div>
      <Separator className="mt-4 mb-6 bg-[#f7f7f8] h-[2px]" />
      {/* <Form {...form}> */}
      <div className="space-y-6">
        <div className="flex *:flex-1 justify-between gap-[25px]">
          <FormField
            control={form.control}
            name="highest_degree"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("academic_degree.label")}
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
                            {t("academic_degree.placeholder")}
                          </SelectPlaceholder>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bachelor">
                      {t("academic_degree.bachelor")}
                    </SelectItem>
                    <SelectItem value="doctorate">
                      {t("academic_degree.doctorate")}
                    </SelectItem>
                    <SelectItem value="master">
                      {t("academic_degree.master")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between *:flex-1 gap-4">
          <FormField
            control={form.control}
            name="university"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("university")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("university_label")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-4 *:flex-1">
          <FormField
            control={form.control}
            name="graduation_year"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("grad_year")}
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-start justify-start  font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="h-4 w-4 opacity-50" />
                          {field.value ? (
                            field.value
                          ) : (
                            <span> {t("grad_year_placeholder")}</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={new Date(
                          Date.now() - 100 * 365 * 24 * 60 * 60 * 1000
                        ).getFullYear()}
                        toYear={new Date(Date.now()).getFullYear()}
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(format(date, "yyyy-MM-dd"));
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
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

export default Step2;
