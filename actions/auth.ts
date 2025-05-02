"use server";
import { fetchData } from "@/lib/utils";
import { RegisterFormValues } from "@/schemas/register";
import { ActionStateResult } from "@/types/action-state";
import { getLocale } from "./intl";
import { redirect } from "@/i18n/routing";
import { cookies } from "next/headers";
import { UserProfile } from "@/types/User";
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
    { formData: true, fromLogin: true }
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
export async function handleUnauthenticated() {
  const locale = await getLocale();
  return redirect({ href: "/login", locale });
}

export async function handleForbidden() {
  const locale = await getLocale();
  return redirect({
    href: "/",
    locale,
  });
}
export async function getUserToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function setAuthToken(token: string) {
  (await cookies()).set("token", token, {
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  });
}
export async function isAuthenticated() {
  const token = await getUserToken();
  if (token) {
    const req = await fetchData(`/auth/view-profile`, undefined, {
      formData: false,
      fromLogin: true,
    });
    if (req.ok) {
      const res = (await req.json()).data.user as UserProfile;

      return {
        is_active: res.is_active,
        is_role_active: res.role.is_active,
        registration_status: res.registration_status,
      } as {
        is_active: boolean;
        is_role_active: boolean;
        registration_status: "pending" | "approved" | "rejected";
      };
    }
  }
  return null;
}

export async function logout() {
  const cookieStore = await cookies();
  const locale = await getLocale();

  await fetchData("/auth/logout", { method: "POST" });
  cookieStore.delete("token");
  return redirect({
    href: "/login",
    locale,
  });
}
export async function getUser() {
  const req = await fetchData(`/auth/view-profile`);
  if (req.ok) {
    return (await req.json()).data.user as UserProfile;
  }
  return;
}
