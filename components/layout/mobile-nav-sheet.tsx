"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

type MobileNavSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
};

export function MobileNavSheet({
  open,
  onOpenChange,
  pathname,
}: MobileNavSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="h-9 w-9 rounded-full bg-[#FFEAF4] hover:bg-[#FFD6E8] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none lg:hidden dark:bg-[#2A1520] dark:hover:bg-[#3A2530]"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu size={18} className="text-[#FF5FA2]" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(100vw,320px)] border-[#FFD6E8] bg-[#FFF9FC] p-0 dark:border-[#3A2530] dark:bg-[#1A0D13]"
      >
        <SheetHeader className="border-b border-[#FFD6E8] px-6 py-5 dark:border-[#3A2530]">
          <SheetTitle className="font-display text-xl font-bold text-[#2F2F2F] dark:text-white">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-4 py-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => onOpenChange(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3.5 font-sans text-[15px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none",
                  isActive
                    ? "bg-[#FFEAF4] text-[#FF5FA2] dark:bg-[#2A1520]"
                    : "text-[#2F2F2F] hover:bg-[#FFEAF4] dark:text-white/80 dark:hover:bg-[#2A1520]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
