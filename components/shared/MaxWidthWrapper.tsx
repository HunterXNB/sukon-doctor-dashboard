import { cn } from "@/lib/utils";
import type React from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-4 md:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
