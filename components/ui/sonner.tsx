"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#2F2F2F] group-[.toaster]:border-[#FFD6E8] group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-[#2A1520] dark:group-[.toaster]:text-white dark:group-[.toaster]:border-[#3A2530]",
          description: "group-[.toast]:text-[#9B8B97] dark:group-[.toast]:text-white/55",
          actionButton:
            "group-[.toast]:bg-[#FF5FA2] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[#FFEAF4] group-[.toast]:text-[#FF5FA2]",
        },
      }}
      {...props}
    />
  );
}
