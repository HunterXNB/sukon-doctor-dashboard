"use client";

import { ActionStateResult } from "@/types/action-state";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function useFormServerError<T extends FieldValues>(
  form: UseFormReturn<T>,
  actionState: ActionStateResult<Path<T>> | undefined
) {
  const locale = useLocale();
  const {
    setError,
    formState: { errors },
    clearErrors,
  } = form;
  useEffect(() => {
    if (actionState && "error" in actionState) {
      if (actionState.error.type === "validation") {
        const errorsArr = Object.entries(actionState?.error.fields) as [
          Path<T>,
          string[]
        ][];
        errorsArr.forEach(([key, err]) => {
          setError(key, {
            message: err?.[0],
            type: "backend",
          });
        });
      }
    }
  }, [actionState, setError]);
  useEffect(() => {
    if (actionState?.locale !== locale) {
      const formCustomErrors = Object.entries(errors)
        .filter(([, err]) => err?.type === "backend")
        .map(([name]) => name);
      if (formCustomErrors) {
        clearErrors(formCustomErrors as []);
      }
    }
  }, [locale, actionState, errors, clearErrors]);
}
