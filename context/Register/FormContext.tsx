import React, { ReactNode, useEffect, useState } from "react";
import "client-only";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, RegisterSchema } from "@/schemas/register";
import { Form } from "@/components/ui/form";
function RegisterFormContextProvider({ children }: { children: ReactNode }) {
  const [formValues] = useState(() =>
    JSON.parse(localStorage.getItem("form_values") ?? "{}")
  );
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: formValues?.first_name ?? "",
      last_name: formValues?.last_name ?? "",
      title: formValues?.title ?? "",
      email: formValues?.email ?? "",
      mobile: formValues?.mobile ?? "",
      date_of_birth: formValues?.date_of_birth ?? "",
      gender: formValues?.gender ?? "",
      years_of_experience: formValues?.years_of_experience ?? "",
      cv: formValues?.cv ?? [],
      certificates: formValues?.certificates ?? [],
      licensing_area: formValues?.licensing_area ?? "",
      licensing_number: formValues?.licensing_number ?? "",
      work_on_clinic: formValues?.work_on_clinic ?? "",
      role_id: formValues?.role_id ?? "",
      specifications: formValues?.specifications ?? "",
      highest_degree: formValues?.highest_degree ?? "",
      university: formValues?.university ?? "",
      graduation_year: formValues?.graduation_year ?? "",
      fluent_language: formValues?.fluent_language ?? "",
      country_of_residence: formValues?.country_of_residence ?? "",
      nationality: formValues?.nationality ?? "",
      has_more_than_one_qualification:
        formValues?.has_more_than_one_qualification ?? "",
    },
    mode: "all",
  });
  const { watch } = methods;
  const watchFormFields = watch();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cv, certificates, ...fields } = watchFormFields;
    localStorage.setItem("form_values", JSON.stringify(fields));
  }, [watchFormFields]);
  return <Form {...methods}>{children}</Form>;
}

export default RegisterFormContextProvider;
