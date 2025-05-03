"use client";
import { Link, usePathname } from "@/i18n/routing";
import React from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { NavItem } from "@/types/nav";
import { useTranslations } from "next-intl";

function NavigationItem({
  item,
  nested = false,
}: {
  item: NavItem;
  nested?: boolean;
}) {
  const pathname = usePathname();
  const t = useTranslations("sidebar.nav");
  if (item.type === "link" && nested)
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          className={cn(
            "hover:bg-primary-50 hover:text-primary [&_svg]:text-[#6C6C89] [&_svg]:hover:text-primary [&_.fill-path]:hover:fill-primary [&_path:not(.fill-path)]:hover:stroke-primary",
            {
              "bg-primary-50 text-primary [&_svg]:text-primary [&_.fill-path]:fill-primary [&_path:not(.fill-path)]:stroke-primary":
                pathname === item.href,
            }
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            <span>{t(item.label)}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  if (item.type === "group")
    return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "hover:bg-primary-50 hover:text-primary cursor-pointer select-none [&_svg]:text-[#6C6C89] [&_svg]:hover:text-primary [&_.fill-path]:hover:fill-primary [&_path:not(.fill-path)]:hover:stroke-primary",
                {
                  "data-[state=closed]:bg-primary-50 data-[state=closed]:text-primary data-[state=closed]:[&_svg]:text-primary data-[state=closed]:[&_.fill-path]:fill-primary data-[state=closed]:[&_path:not(.fill-path)]:stroke-primary":
                    pathname.startsWith(item.href),
                }
              )}
              asChild
            >
              <div>
                {item.icon}
                <span>{t(item.label)}</span>
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((subItem) => (
                <NavigationItem key={subItem.label} item={subItem} nested />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  return (
    <SidebarMenuItem key={item.label}>
      <SidebarMenuButton
        className={cn(
          "hover:bg-primary-50 hover:text-primary [&_svg]:text-[#6C6C89] [&_svg]:hover:text-primary [&_.fill-path]:hover:fill-primary [&_path:not(.fill-path)]:hover:stroke-primary",
          {
            "bg-primary-50 text-primary [&_svg]:text-primary [&_.fill-path]:fill-primary [&_path:not(.fill-path)]:stroke-primary":
              pathname === item.href,
          }
        )}
        asChild
      >
        <Link href={item.href}>
          {item.icon}
          <span>{t(item.label)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default NavigationItem;
