import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./actions/auth";
const protectedRoutes = ["/dashboard"];
export default async function middleware(req: NextRequest) {
  const authenticated = await isAuthenticated();
  const pathname =
    "/" +
    req.nextUrl.pathname
      .split("/")
      .filter((p) => p !== "")
      .slice(1)
      .join("/");
  if (pathname !== "/") {
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/register/form"
    ) {
      if (authenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
      }
    } else if (protectedRoutes.includes(`/${pathname.split("/")[1]}`)) {
      if (!authenticated) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }
      if (
        authenticated?.registration_status === "pending" ||
        authenticated?.registration_status === "rejected"
      )
        return NextResponse.redirect(new URL("/approval-waiting", req.nextUrl));
    }
    if (
      authenticated &&
      !(authenticated.is_active && authenticated.is_role_active) &&
      pathname !== "/dashboard"
    )
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  return createMiddleware(routing)(req);
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
