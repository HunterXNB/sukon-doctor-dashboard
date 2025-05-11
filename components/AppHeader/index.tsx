"use client";

import { Bell, CalendarDays, Menu } from "lucide-react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Image from "next/image";
import AvatarImage from "@/assets/avatar.svg";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const { open, isMobile, openMobile } = useSidebar();
  return (
    <header className="flex items-center @container py-4 px-6 sticky z-[40] top-0 h-20 bg-sidebar gap-2">
      {isMobile
        ? !openMobile && (
            <SidebarTrigger className="p-0 hover:bg-transparent  hover:text-primary">
              <Menu className="!w-6 !h-6" />
            </SidebarTrigger>
          )
        : !open && (
            <SidebarTrigger className="p-0 hover:bg-transparent hover:text-primary ">
              <Menu className="!w-6 !h-6 " />
            </SidebarTrigger>
          )}
      <div id="header-portal" className="contents"></div>
      <div className="rtl:mr-auto  h-full ltr:ml-auto flex items-center gap-4">
        <div className=" flex gap-2">
          <Button className="relative" variant={"outline"} size={"icon"}>
            <Bell />
            <Badge
              variant={"destructive-extra"}
              className="absolute pointer-events-none top-0 rtl:right-0 ltr:left-0 ltr:-translate-x-1/2 rtl:translate-x-1/2 aspect-square scale-[0.6] -translate-y-1/2"
            >
              1
            </Badge>
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <CalendarDays />
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-[10px]">
          <div className="w-[50px] aspect-square flex items-center justify-center cursor-pointer">
            <div className="relative w-10 h-10">
              <Image src={AvatarImage} alt="Avatar" width={40} height={40} />
              <div className="w-[15px] bg-white aspect-square absolute bottom-0 right-0 rounded-full flex items-center justify-center ">
                <div className="w-[10px] aspect-square rounded-full bg-[#0C9D61]"></div>
              </div>
            </div>
          </div>
          <div className="md:block hidden">
            <h3 className="font-medium text-secondary-800 text-[17.5px]">
              مهند السايح
            </h3>
            <p className="text-secondary-500 text-[15px]">طبيب جراح</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export const AppHeaderPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [headerPortal, setHeaderPortal] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const headerPortal = document.getElementById(
      "header-portal"
    ) as HTMLDivElement;
    if (!headerPortal) return;
    setHeaderPortal(headerPortal);
  }, []);

  if (headerPortal === null) return;
  return createPortal(children, headerPortal);
};
