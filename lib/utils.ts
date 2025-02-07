// import {
//   getUserToken,
//   handleForbidden,
//   handleUnauthenticated,
// } from "@/actions/auth";
import { clsx, type ClassValue } from "clsx";
import { getLocale } from "next-intl/server";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData(
  endpoint: RequestInfo | URL | string,
  requestInit: RequestInit = {
    method: "GET",
    headers: {},
  }
  // fromLogin: boolean = false
): Promise<Response> {
  if (!requestInit.headers) requestInit.headers = {};
  // const [token, locale] = await Promise.all([getUserToken(), getLocale()]);
  const locale = await getLocale();

  requestInit.headers = {
    ["x-api-key"]: process.env.NEXT_PUBLIC_API_KEY as string,
    Accept: "application/json",
    // Authorization: `Bearer ${token}`,
    "Accept-Language": locale,
    "Content-Type": "application/json",
    ...requestInit.headers,
  };
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    requestInit
  );
  // if (request.status === 401) {
  //   if (!fromLogin) await handleUnauthenticated();
  // } else if (request.status === 403) {
  //   if (!fromLogin) await handleForbidden();
  // }
  return request;
}
