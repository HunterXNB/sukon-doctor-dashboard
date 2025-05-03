import { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
} & (
  | {
      type: "link";
    }
  | { type: "group"; children: NavItem[] }
);
