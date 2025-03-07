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
import { RegisterFormValues, step1RegisterSchema } from "@/schemas/register";
import { useStepper } from "@/context/Register/StepperContext";
import { useLocale, useTranslations } from "next-intl";
import { register } from "@/actions/auth";
const Step1 = ({
  state,
}: {
  state: Awaited<ReturnType<typeof register>> | undefined;
}) => {
  const { watch, ...form } = useFormContext<RegisterFormValues>();
  const locale = useLocale();
  const { nextStep } = useStepper();
  const watchedFields = watch(stepToFieldMap[1]);
  const [isStepValid, setIsStepValid] = useState(false);
  const t = useTranslations("registerPage.form.step2");
  useEffect(() => {
    async function validateStep() {
      try {
        const schema = step1RegisterSchema;
        // @ts-expect-error - just to skip type checking
        const formValues = watchedFields.reduce(
          (acc: Record<keyof RegisterFormValues, unknown>, val, i) => {
            acc[stepToFieldMap[1][i]] = val;
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
      <div className="space-y-6">
        <div className="flex *:flex-1 justify-between gap-[25px]">
          <FormField
            control={form.control}
            name="first_name"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("first_name")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("first_name_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("last_name")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("last_name_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between *:flex-1 gap-4">
          <FormField
            control={form.control}
            name="date_of_birth"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("date_of_birth")}
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
                            <span>{t("date_of_birth_placeholder")}</span>
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
                        toYear={new Date(
                          Date.now() - 18 * 365 * 24 * 60 * 60 * 1000
                        ).getFullYear()}
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
          <FormField
            control={form.control}
            name="title"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("title_input")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("title_input_placeholder")}
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
            name="mobile"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("mobile")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="rtl:text-right "
                    dir="ltr"
                    placeholder={t("mobile_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive text-sm after:content-['*']">
                  {t("email")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("email_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex *:flex-1 justify-between gap-4">
          <FormField
            control={form.control}
            name="gender"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("gender.label")}
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
                            {t("gender.placeholder")}
                          </SelectPlaceholder>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">{t("gender.male")}</SelectItem>
                    <SelectItem value="female">{t("gender.female")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("nationality")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("nationality_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex *:flex-1 justify-between gap-4 ">
          <FormField
            control={form.control}
            name="country_of_residence"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("country_of_residence")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("country_of_residence_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fluent_language"
            translation="registerPage.form.errors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:text-destructive after:content-['*']">
                  {t("language")}
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
                            {t("language_placeholder")}
                          </SelectPlaceholder>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="english">{t("english")}</SelectItem>
                    <SelectItem value="arabic">{t("arabic")}</SelectItem>
                    <SelectItem value="french">{t("french")}</SelectItem>
                    <SelectItem value="spanish">{t("spanish")}</SelectItem>
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
      <Button
        type="button"
        onClick={() => nextStep()}
        className="flex rtl:mr-auto ltr:ml-auto gap-1 w-fit mt-5"
        disabled={!isStepValid}
      >
        {t("next")}
        <ArrowLeft className="ltr:-scale-100" />
      </Button>
      {/* </Form> */}
    </div>
  );
};

export default Step1;
