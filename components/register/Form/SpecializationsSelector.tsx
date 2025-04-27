"use client";

import { useState } from "react";
import MultipleSelector from "@/components/ui/multi-select";
import { fetchData } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Specialization } from "@/types/Specializations";

function SpecializationsSelector<T>({ field }: { field: T }) {
  const [err, setErr] = useState(false);
  const t = useTranslations("registerPage.form.specializationsSelector");

  return (
    <MultipleSelector
      {...field}
      onSearch={async (value) => {
        const req = await fetchData(`/categories/index?search=${value}`);
        if (!req.ok) {
          setErr(true);
          return [];
        }
        const res = await req.json();
        const data = (res.data.data as Specialization[]).map(
          (specialization) => ({
            value: specialization.id.toString(),
            label: specialization.name,
          })
        );
        return data;
      }}
      triggerSearchOnFocus
      placeholder={t("placeholder")}
      loadingIndicator={
        <p className="py-5 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </p>
      }
      emptyIndicator={
        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
          {err ? t("error") : t("noSpecializations")}
        </p>
      }
    />
  );
}

export default SpecializationsSelector;
