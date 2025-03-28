"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import DashboardImg from "@/assets/dashboard.png";
import LogoImg from "@/assets/logo.svg";
import VerifyImg from "@/assets/veify.gif";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useTranslations } from "next-intl";

function LoginPage() {
  const [email, setEmail] = useState("");
  return !email ? (
    <LoginForm key={"login"} setEmail={setEmail} />
  ) : (
    <VerifyOTP key={"verify"} />
  );
}
const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "emailRequired",
    })
    .email("emailInvalid"),
});
type LoginFormData = z.infer<typeof loginFormSchema>;

function LoginForm({ setEmail }: { setEmail: (email: string) => void }) {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const t = useTranslations("loginPage.loginForm");
  function onSubmit(value: LoginFormData) {
    console.log("submitted", value);
    setEmail(value.email);
    window?.scrollTo?.(0, 0);
  }

  return (
    <div className="flex flex-wrap p-6 md:p-8 gap-4 min-h-screen flex-col md:flex-row justify-between">
      <div className="md:p-8 p-0 max-md:min-h-screen flex flex-col flex-1 ">
        <Link href={"/"}>
          <Image src={LogoImg} alt="sukon" className="size-12 md:size-16" />
        </Link>
        <div className="my-auto  space-y-6 md:space-y-8">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl md:text-[28px] lg:text-[32px] text-[#1d1f1f]">
              {t("title")}
            </h1>
            <p className="lg:text-xl md:text-[18px] sm:text-[12px] text-[#666]">
              {t("description")}
            </p>
          </div>
          <Card className="w-full p-9 shadow-none max-w-[600px]">
            <CardContent className="p-0 flex flex-col gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    translation="loginPage.loginForm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("emailLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("emailPlaceholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-[#6c6c89]">
                          {t("emailDescription")}
                        </p>
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    {t("submitBtn")} <ArrowLeft className="ltr:-scale-x-100" />
                  </Button>
                </form>
              </Form>
              <div className="flex justify-center items-center relative">
                <Separator className="bg-[#A9A9BC] z-0 absolute" />
                <p className="bg-white z-10 px-[6px] text-[#A9A9BC]">
                  {t("or")}
                </p>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1" variant={"outline"}>
                  <Image
                    src={"/google.svg"}
                    alt="google"
                    width={24}
                    height={24}
                  />
                  {t("google")}
                </Button>
                <Button className="flex-1" variant={"outline"}>
                  <Image
                    src={"/facebook.svg"}
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                  {t("facebook")}
                </Button>
              </div>
              <div className="text-sm text-[#ABABAB] text-center">
                {t.rich("noAccount", {
                  a: (c) => (
                    <Button asChild variant={"link"} className="inline p-0 h-0">
                      <Link href={"/register"}>{c}</Link>
                    </Button>
                  ),
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex-1 max-md:min-h-[calc(100vh-48px)] flex flex-col overflow-hidden relative bg-primary rounded">
        <Image
          fill
          src={"/Ornament (1).svg"}
          className="w-full z-0 h-full object-cover"
          alt="ornament"
        />
        <div className="flex flex-1 flex-col @container-[size] h-full z-1 gap-8 relative  justify-center items-center">
          <h2 className="font-bold text-[clamp(16px,8cqi,48px)]   text-white max-w-[566px] rtl:mr-4 ltr:ml-4 ">
            {t("hero")}
          </h2>
          <div className="relative overflow-hidden w-full max-w-[560px] self-end aspect-[560/394]">
            <Image
              src={DashboardImg}
              className="w-full max-w-[560px] absolute rtl:left-0 ltr:-scale-x-100 ltr:right-0"
              alt="dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const verifyFormSchema = z.object({
  otp: z
    .string({
      required_error: "otpRequired",
    })
    .trim()
    .length(4, "otpRequired")
    .regex(/^\d{4}$/, "otpInvalid"),
});
type VerifyFormData = z.infer<typeof verifyFormSchema>;
function VerifyOTP() {
  const form = useForm<VerifyFormData>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(verifyFormSchema),
  });
  const t = useTranslations("loginPage.verifyForm");
  const [disabled, setDisabled] = useState(true);
  function onSubmit(value: VerifyFormData) {
    console.log("submitted", value);
  }
  return (
    <div className="flex flex-wrap min-h-screen flex-col md:flex-row justify-between">
      <div className="md:p-16 p-6 max-md:min-h-screen flex flex-col flex-1 ">
        <Link href={"/"}>
          <Image src={LogoImg} alt="sukon" className="size-12 md:size-16" />
        </Link>
        <div className="my-auto  space-y-6 md:space-y-8">
          <Card className="w-full p-9 max-md:mx-auto shadow-none max-w-[600px]">
            <CardContent className="p-0 flex flex-col ">
              <div className="mb-6">
                <p className="text-2xl font-bold">{t("title")}</p>
                <p className="text-[#8e8e8e]">{t("description")}</p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="otp"
                    translation="login.form"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP
                            maxLength={4}
                            {...field}
                            onChange={async (e) => {
                              try {
                                await verifyFormSchema.shape.otp.parse(
                                  e.toString()
                                );
                                if (disabled) setDisabled(false);
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              } catch (_) {
                                if (!disabled) setDisabled(true);
                              } finally {
                                field.onChange(e);
                              }
                            }}
                          >
                            <InputOTPGroup
                              dir="ltr"
                              className="flex w-full gap-2 justify-between"
                            >
                              <InputOTPSlot
                                className="w-[clamp(80px,20%,150px)] border rounded-md"
                                index={0}
                              />
                              <InputOTPSlot
                                className="w-[clamp(80px,20%,150px)] border rounded-md"
                                index={1}
                              />
                              <InputOTPSlot
                                className="w-[clamp(80px,20%,150px)] border rounded-md"
                                index={2}
                              />
                              <InputOTPSlot
                                className="w-[clamp(80px,20%,150px)] border rounded-md"
                                index={3}
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <ResendCounter />
                    <Button
                      disabled={disabled}
                      className="w-full"
                      type="submit"
                    >
                      {t("submitBtn")}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex-1 max-md:min-h-screen flex items-center justify-center overflow-hidden relative bg-[#f8f8f8]">
        <Image src={VerifyImg} alt="verify gif" />
      </div>
    </div>
  );
}

function ResendCounter() {
  const [seconds, setSeconds] = useState(30);
  const t = useTranslations("loginPage.verifyForm.resendCounter");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds === 0) return clearTimeout(timer);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearTimeout(timer);
    {
    }
  }, [seconds]);
  return (
    <div className="text-center text-[#6C6C89]">
      {t("base")}{" "}
      {seconds > 0 ? (
        <span className="font-bold text-black">
          {t("counter", { seconds })}
        </span>
      ) : (
        <Button
          type="button"
          onClick={() => setSeconds(30)}
          variant={"link"}
          className="p-0 inline m-0"
        >
          {t("link")}
        </Button>
      )}
    </div>
  );
}

export default LoginPage;
