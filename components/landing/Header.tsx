"use client";
import React from "react";
import LogoSVG from "@/assets/logo.svg";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import LangToggler from "./LangToggler";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
const links = [
  { name: "home", href: "/" },
  { name: "about", href: "/" },
  { name: "services", href: "/" },
  { name: "contact", href: "/" },
];
function Header() {
  //   const { scrollY } = useScroll();
  //   const [seeHeader, setSeeHeader] = useState<boolean | null>(null);
  //   useMotionValueEvent(scrollY, "change", (current) => {
  //     const previousValue = scrollY.getPrevious();
  //     if (!previousValue) {
  //       return;
  //     }
  //     const difference = current - previousValue;
  //     if (difference < 0) setSeeHeader(true);
  //     else if (difference > 0) setSeeHeader(false);
  //   });
  const t = useTranslations("landing.header");
  return (
    <header className="flex items-center justify-between">
      <Image src={LogoSVG} alt="Sukon" className="lg:h-16 lg:w-16 w-12 h-12" />
      <div className="flex gap-8 lg:gap-16">
        <nav className="md:flex items-center hidden ">
          <ul className="flex items-center gap-5 lg:gap-10">
            {links.map((link) => (
              <Link
                className="transition-colors whitespace-nowrap duration-300 hover:text-primary"
                key={link.name}
                href={link.href}
              >
                {t(`navigations.${link.name}`)}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4 lg:gap-9">
          <LangToggler />
          <div className="flex gap-2">
            <Button variant={"ghost"} asChild>
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button asChild>
              <Link href="/register">{t("register")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
