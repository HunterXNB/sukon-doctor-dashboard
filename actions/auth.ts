"use server";
import { fetchData } from "@/lib/utils";
import { RegisterFormValues } from "@/schemas/register";
import { ActionStateResult } from "@/types/action-state";
import { getLocale } from "./intl";
type RegisterFields = keyof RegisterFormValues;
export async function register(
  state: ActionStateResult<RegisterFields> | undefined,
  userData: FormData
): Promise<ActionStateResult<RegisterFields>> {
  const locale = await getLocale();

  const req = await fetchData(
    "/auth/register-provider",
    {
      method: "POST",
      body: userData,
    },
    { formData: true }
  );

  const res = await req.json();
  if (!req.ok) {
    if (req.status === 422) {
      return {
        error: {
          type: "validation",
          fields: res.errors,
          message: res.message,
        },
        locale,
      };
    } else {
      return {
        error: {
          type: "global",
          message: res.message,
        },
        locale,
      };
    }
  }
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
