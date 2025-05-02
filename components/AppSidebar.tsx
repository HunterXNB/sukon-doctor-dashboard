"use client";
import React, { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import Logo from "@/assets/sidebar-logo.svg";
import { CalendarDays, IndentDecrease, MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
} & (
  | {
      type: "link";
    }
  | { type: "group"; children: NavItem[] }
);
const DASHBOARD_LINKS: NavItem[] = [
  {
    label: "الرئيسية",
    type: "link",
    href: "/dashboard",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
          fill="#6C6C89"
          className="fill-path"
        />
      </svg>
    ),
  },
  {
    label: "المواعيد",
    type: "group",
    href: "/dashboard/appointments",
    icon: <CalendarDays width={24} height={24} />,
    children: [
      {
        label: "مواعيد الحجوزات",
        type: "link",
        href: "/dashboard/appointments/reservations",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
              fill="#6C6C89"
            />
          </svg>
        ),
      },
    ],
  },
  {
    label: "قائمة الحالات",
    type: "link",
    href: "/dashboard/akaj",
    icon: (
      <svg
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M16.8877 7.89673C18.2827 7.70073 19.3567 6.50473 19.3597 5.05573C19.3597 3.62773 18.3187 2.44373 16.9537 2.21973"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M18.7285 11.2502C20.0795 11.4522 21.0225 11.9252 21.0225 12.9002C21.0225 13.5712 20.5785 14.0072 19.8605 14.2812"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8867 11.6638C7.67273 11.6638 4.92773 12.1508 4.92773 14.0958C4.92773 16.0398 7.65573 16.5408 10.8867 16.5408C14.1007 16.5408 16.8447 16.0588 16.8447 14.1128C16.8447 12.1668 14.1177 11.6638 10.8867 11.6638Z"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8869 8.88788C12.9959 8.88788 14.7059 7.17888 14.7059 5.06888C14.7059 2.95988 12.9959 1.24988 10.8869 1.24988C8.7779 1.24988 7.0679 2.95988 7.0679 5.06888C7.0599 7.17088 8.7569 8.88088 10.8589 8.88788H10.8869Z"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M4.88509 7.89673C3.48909 7.70073 2.41609 6.50473 2.41309 5.05573C2.41309 3.62773 3.45409 2.44373 4.81909 2.21973"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M3.044 11.2502C1.693 11.4522 0.75 11.9252 0.75 12.9002C0.75 13.5712 1.194 14.0072 1.912 14.2812"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "الرسائل",
    type: "link",
    href: "/dashboard/messages",
    icon: <MessageCircleMore width={24} height={24} />,
  },
  {
    label: "التقارير المالية",
    type: "link",
    href: "/dashboard/financial-reports",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.7379 2.76175H8.08493C6.00493 2.75375 4.29993 4.41175 4.25093 6.49075V17.2037C4.20493 19.3167 5.87993 21.0677 7.99293 21.1147C8.02393 21.1147 8.05393 21.1157 8.08493 21.1147H16.0739C18.1679 21.0297 19.8179 19.2997 19.8029 17.2037V8.03775L14.7379 2.76175Z"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4751 2.75V5.659C14.4751 7.079 15.6231 8.23 17.0431 8.234H19.7981"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M14.2882 15.3585H8.88818"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M12.2432 11.606H8.88721"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "المقالات التعليمية",
    type: "link",
    href: "/dashboard/articles",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M12.0001 8.90996C11.5101 8.90996 11.0301 8.72995 10.6601 8.35995L7.99013 5.68996C7.45013 5.14996 7.28016 4.33995 7.58016 3.61995C7.87016 2.90995 8.56016 2.44995 9.33016 2.44995H14.6801C15.4501 2.44995 16.1401 2.90995 16.4301 3.61995C16.7201 4.32995 16.5602 5.13996 16.0202 5.68996L13.3501 8.35995C12.9701 8.71995 12.4901 8.90996 12.0001 8.90996ZM9.05013 4.61995L11.7201 7.28995C11.8701 7.43995 12.1202 7.43995 12.2802 7.28995L14.9502 4.61995C15.1202 4.44995 15.0702 4.25996 15.0302 4.18996C14.9902 4.11996 14.9001 3.94995 14.6701 3.94995H9.32015C9.08015 3.94995 8.99016 4.11996 8.96016 4.18996C8.93016 4.25996 8.88013 4.44995 9.05013 4.61995Z"
          fill="#6C6C89"
        />
        <path
          opacity="0.4"
          d="M14.6698 21.56H9.31985C8.54985 21.56 7.85985 21.1 7.56985 20.39C7.27985 19.68 7.43983 18.87 7.97983 18.32L10.6499 15.65C11.3699 14.93 12.6099 14.93 13.3299 15.65L15.9998 18.32C16.5398 18.86 16.7098 19.68 16.4098 20.39C16.1298 21.1 15.4398 21.56 14.6698 21.56ZM9.04983 19.38C8.87983 19.55 8.92982 19.74 8.96982 19.81C9.00982 19.88 9.09986 20.05 9.32986 20.05H14.6798C14.9198 20.05 15.0098 19.88 15.0398 19.81C15.0698 19.74 15.1199 19.55 14.9599 19.38L12.2898 16.71C12.1398 16.56 11.8898 16.56 11.7298 16.71L9.04983 19.38Z"
          fill="#6C6C89"
        />
        <path
          d="M5.23014 17.2499C5.17014 17.2499 5.10019 17.2499 5.03019 17.2399C4.49019 17.1799 4.02014 16.8899 3.73014 16.4299L1.52018 12.9499C1.15018 12.3699 1.15018 11.6299 1.52018 11.0499L3.73014 7.56994C4.02014 7.11994 4.49019 6.81993 5.03019 6.75993C5.56019 6.69993 6.09013 6.88994 6.47013 7.26994L9.95017 10.7499C10.2802 11.0799 10.4701 11.5299 10.4701 11.9999C10.4701 12.4699 10.2902 12.9199 9.95017 13.2499L6.48014 16.7299C6.15014 17.0599 5.70014 17.2499 5.23014 17.2499ZM2.79013 11.8599C2.73013 11.9499 2.73013 12.0599 2.79013 12.1499L5.00016 15.6299C5.06016 15.7199 5.15017 15.7499 5.20017 15.7499C5.25017 15.7499 5.34014 15.7499 5.42014 15.6699L8.90018 12.1899C8.97018 12.1199 8.98014 12.0399 8.98014 11.9999C8.98014 11.9599 8.97018 11.8799 8.90018 11.8099L5.42014 8.32994C5.34014 8.24994 5.25017 8.24993 5.20017 8.24993C5.15017 8.25993 5.06016 8.27993 5.00016 8.36993L2.79013 11.8599Z"
          fill="#6C6C89"
        />
        <path
          d="M18.77 17.2499C18.3 17.2499 17.86 17.0699 17.52 16.7299L14.04 13.2499C13.71 12.9199 13.52 12.4699 13.52 11.9999C13.52 11.5299 13.7 11.0799 14.04 10.7499L17.51 7.26994C17.89 6.88994 18.42 6.69993 18.95 6.75993C19.49 6.81993 19.96 7.10994 20.25 7.56994L22.46 11.0499C22.83 11.6299 22.83 12.3699 22.46 12.9499L20.25 16.4299C19.96 16.8899 19.49 17.1799 18.95 17.2399C18.9 17.2399 18.83 17.2499 18.77 17.2499ZM18.77 8.25993C18.72 8.25993 18.65 8.26993 18.58 8.33993L15.1 11.8199C15.03 11.8899 15.02 11.9699 15.02 12.0099C15.02 12.0499 15.03 12.1299 15.1 12.1999L18.58 15.6799C18.66 15.7599 18.75 15.7599 18.8 15.7599C18.85 15.7499 18.94 15.7299 19 15.6399L21.21 12.1599C21.27 12.0699 21.27 11.9599 21.21 11.8699L19 8.38993C18.94 8.29993 18.85 8.26994 18.8 8.26994C18.79 8.25994 18.78 8.25993 18.77 8.25993Z"
          fill="#6C6C89"
        />
      </svg>
    ),
  },
];
const SETTINGS_LINKS: NavItem[] = [
  {
    label: "بيانات التطبيق",
    type: "link",
    href: "/dashboard/app-settings",
    icon: (
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.2381 12.8094H5.7619M2.90476 15.1904H9.09524C10.1472 15.1904 11 14.3376 11 13.2856V3.28562C11 2.23365 10.1472 1.38086 9.09524 1.38086H2.90476C1.85279 1.38086 1 2.23365 1 3.28562V13.2856C1 14.3376 1.85279 15.1904 2.90476 15.1904Z"
          stroke="#6C6C89"
          strokeWidth="1.42857"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "تواصل معنا",
    type: "link",
    href: "/dashboard/contact-us",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.41729 8.08564C10.2516 10.9192 10.8946 7.64109 12.6993 9.44447C14.4391 11.1838 15.439 11.5323 13.2347 13.736C12.9586 13.9579 11.2043 16.6275 5.03906 10.464C-1.12695 4.29968 1.54113 2.54358 1.76308 2.26754C3.97275 0.0577326 4.31522 1.06351 6.05503 2.80284C7.85968 4.60698 4.58294 5.25208 7.41729 8.08564Z"
          stroke="#6C6C89"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "الإعدادات",
    type: "link",
    href: "/dashboard/settings",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.6787 8.03902C10.6787 9.51897 9.47943 10.7187 8.00013 10.7187C6.52082 10.7187 5.3216 9.51897 5.3216 8.03902C5.3216 6.55908 6.52082 5.35935 8.00013 5.35935C9.47943 5.35935 10.6787 6.55908 10.6787 8.03902ZM9.07154 8.03902C9.07154 8.631 8.59185 9.1109 8.00013 9.1109C7.4084 9.1109 6.92872 8.631 6.92872 8.03902C6.92872 7.44705 7.4084 6.96715 8.00013 6.96715C8.59185 6.96715 9.07154 7.44705 9.07154 8.03902Z"
          fill="#6C6C89"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.33223 0C6.34049 0 5.53653 0.804306 5.53653 1.79647V2.53358C5.53653 2.59411 5.49128 2.71618 5.32525 2.80296C5.16041 2.88912 5.00028 2.98296 4.84534 3.08401C4.68709 3.18722 4.55718 3.16563 4.50427 3.13507L3.86163 2.76388C3.00276 2.2678 1.90453 2.5622 1.40866 3.42143L0.740877 4.57857C0.24501 5.4378 0.53928 6.53651 1.39815 7.03259L2.09187 7.43328C2.14399 7.46339 2.22567 7.5617 2.21978 7.74512C2.21776 7.80783 2.21675 7.87076 2.21675 7.9339C2.21675 8.03728 2.21947 8.14011 2.22485 8.2423C2.23476 8.43073 2.15117 8.53247 2.09816 8.56309L1.39816 8.96741C0.539287 9.46349 0.245018 10.5622 0.740885 11.4214L1.40867 12.5786C1.90454 13.4378 3.00277 13.7322 3.86164 13.2361L4.61211 12.8026C4.66409 12.7726 4.7902 12.7509 4.94652 12.8483C5.06971 12.925 5.19603 12.9973 5.32525 13.0648C5.49128 13.1516 5.53653 13.2737 5.53653 13.3342V14.2035C5.53653 15.1957 6.34049 16 7.33223 16H8.6678C9.65953 16 10.4635 15.1957 10.4635 14.2035V13.3343C10.4635 13.2738 10.5088 13.1517 10.6748 13.0649C10.804 12.9974 10.9304 12.9251 11.0536 12.8483C11.2099 12.7509 11.336 12.7727 11.388 12.8027L12.1384 13.2361C12.9972 13.7322 14.0955 13.4378 14.5913 12.5786L15.2591 11.4214C15.755 10.5622 15.4607 9.46349 14.6018 8.96741L13.902 8.56318C13.849 8.53256 13.7654 8.43082 13.7753 8.24238C13.7807 8.14016 13.7834 8.03731 13.7834 7.9339C13.7834 7.87073 13.7824 7.80777 13.7804 7.74503C13.7745 7.56162 13.8562 7.4633 13.9083 7.43319L14.6019 7.03259C15.4607 6.53651 15.755 5.4378 15.2591 4.57857L14.5913 3.42143C14.0955 2.5622 12.9972 2.2678 12.1384 2.76388L11.4958 3.13502C11.4429 3.16558 11.313 3.18717 11.1547 3.08397C10.9998 2.98291 10.8397 2.88906 10.6748 2.80289C10.5088 2.71611 10.4635 2.59404 10.4635 2.53352V1.79647C10.4635 0.804306 9.65954 0 8.6678 0H7.33223ZM7.14365 1.79647C7.14365 1.69227 7.22808 1.60781 7.33223 1.60781H8.6678C8.77195 1.60781 8.85638 1.69227 8.85638 1.79647V2.53352C8.85638 3.31433 9.35127 3.92515 9.93062 4.22795C10.0496 4.2901 10.1652 4.35785 10.2771 4.43086C10.831 4.79206 11.6161 4.92207 12.2994 4.52742L12.9419 4.15628C13.0321 4.10418 13.1475 4.1351 13.1995 4.22533L13.8673 5.38247C13.9194 5.47271 13.8885 5.58809 13.7983 5.64019L13.1047 6.04079C12.437 6.42646 12.1533 7.14899 12.1741 7.7967C12.1756 7.84223 12.1763 7.88796 12.1763 7.9339C12.1763 8.0091 12.1743 8.08377 12.1704 8.15784C12.1357 8.81763 12.4162 9.5615 13.0984 9.95558L13.7983 10.3598C13.8885 10.4119 13.9194 10.5273 13.8673 10.6175L13.1995 11.7747C13.1475 11.8649 13.0321 11.8958 12.9419 11.8437L12.1915 11.4103C11.5226 11.0239 10.7543 11.1407 10.204 11.4835C10.115 11.539 10.0239 11.5911 9.93062 11.6399C9.35127 11.9427 8.85638 12.5535 8.85638 13.3343V14.2035C8.85638 14.3077 8.77195 14.3922 8.6678 14.3922H7.33223C7.22808 14.3922 7.14365 14.3077 7.14365 14.2035V13.3342C7.14365 12.5534 6.64878 11.9426 6.06945 11.6398C5.97623 11.5911 5.88506 11.5389 5.79608 11.4835C5.24581 11.1407 4.47746 11.0239 3.80855 11.4102L3.05808 11.8437C2.96788 11.8958 2.85255 11.8649 2.80047 11.7747L2.13269 10.6175C2.08061 10.5273 2.11152 10.4119 2.20171 10.3598L2.90171 9.95549C3.58398 9.56142 3.86445 8.81756 3.82974 8.15778C3.82584 8.08372 3.82386 8.00908 3.82386 7.9339C3.82386 7.88798 3.8246 7.84227 3.82606 7.79676C3.84687 7.14906 3.56314 6.42655 2.89543 6.04088L2.2017 5.64019C2.11151 5.58809 2.0806 5.47271 2.13268 5.38247L2.80046 4.22533C2.85254 4.1351 2.96788 4.10418 3.05807 4.15628L3.70071 4.52747C4.38398 4.92212 5.16914 4.79211 5.723 4.43089C5.83493 4.35789 5.95053 4.29015 6.06945 4.22799C6.64878 3.92519 7.14365 3.31438 7.14365 2.53358V1.79647Z"
          fill="#6C6C89"
        />
      </svg>
    ),
  },
];
function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center flex-row p-5 gap-[10px] rtl:pl-4 ltr:pr-4">
        <Link href={"/"}>
          <Image src={Logo} alt="Sukoon" />
        </Link>
        <h1 className="text-[22px] text-[#282833] flex-1 font-bold">سكون</h1>
        <SidebarTrigger className="hover:bg-transparent text-gray-500 hover:text-primary transition-all duration-300 ">
          <IndentDecrease className="rtl:-scale-x-100 !size-6" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>لوحة التحكم</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavigationList items={DASHBOARD_LINKS} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>الإعدادات</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavigationList items={SETTINGS_LINKS} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
function NavigationList({ items }: { items: NavItem[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <NavigationItem key={item.label} item={item} />
      ))}
    </SidebarMenu>
  );
}
function NavigationItem({
  item,
  nested = false,
}: {
  item: NavItem;
  nested?: boolean;
}) {
  const pathname = usePathname();
  console.log(pathname);

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
            <span>{item.label}</span>
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
                  "bg-primary-50 text-primary [&_svg]:text-primary [&_.fill-path]:fill-primary [&_path:not(.fill-path)]:stroke-primary":
                    pathname.startsWith(item.href),
                }
              )}
              asChild
            >
              <div>
                {item.icon}
                <span>{item.label}</span>
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
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default AppSidebar;
