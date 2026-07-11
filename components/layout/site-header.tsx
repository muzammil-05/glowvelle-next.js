"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Heart, Moon, Search, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

const MobileNavSheet = dynamic(
  () =>
    import("@/components/layout/mobile-nav-sheet").then(
      (mod) => mod.MobileNavSheet
    ),
  { loading: () => null }
);

function subscribeToScroll(onStoreChange: () => void) {
  const onScroll = () => onStoreChange();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

function getScrollSnapshot(threshold: number) {
  return window.scrollY > threshold;
}

function getScrollServerSnapshot() {
  return false;
}

const subscribeToClient = () => () => {};

function getClientSnapshot() {
  return true;
}

function getClientServerSnapshot() {
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getClientServerSnapshot
  );
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => getScrollSnapshot(24),
    getScrollServerSnapshot
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#FFD6E8]/60 bg-[#FFF9FC]/92 shadow-sm shadow-[#FF5FA2]/5 backdrop-blur-md dark:border-[#3A2530] dark:bg-[#1A0D13]/92"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label="Glowvelle home"
          className="flex select-none items-center gap-2 rounded-lg sm:gap-2.5 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5FA2] to-[#FF7DB6] shadow-md shadow-[#FF5FA2]/30">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-display text-xl leading-none font-bold tracking-tight text-[#2F2F2F] sm:text-[26px] dark:text-white">
            Glow<span className="text-[#FF5FA2]">velle</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative rounded-lg font-sans text-[13px] font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none",
                  isActive
                    ? "text-[#FF5FA2]"
                    : "text-[#2F2F2F] hover:text-[#FF5FA2] dark:text-white/70"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[1.5px] rounded-full bg-[#FF5FA2] transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Button
            variant="ghost"
            size="icon-lg"
            nativeButton={false}
            render={<Link href="/search" aria-label="Search" />}
            className="h-9 w-9 rounded-full bg-[#FFEAF4] hover:bg-[#FFD6E8] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none sm:h-10 sm:w-10 dark:bg-[#2A1520] dark:hover:bg-[#3A2530]"
          >
            <Search size={15} className="text-[#FF5FA2]" />
          </Button>

          <Button
            variant="ghost"
            size="icon-lg"
            className="h-9 w-9 rounded-full bg-[#FFEAF4] hover:bg-[#FFD6E8] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none sm:h-10 sm:w-10 dark:bg-[#2A1520] dark:hover:bg-[#3A2530]"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted && isDark ? (
              <Sun size={15} className="text-[#D8B36A]" />
            ) : (
              <Moon size={15} className="text-[#9B8B97]" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon-lg"
            className="relative h-9 w-9 rounded-full bg-[#FFEAF4] hover:bg-[#FFD6E8] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none sm:h-10 sm:w-10 dark:bg-[#2A1520] dark:hover:bg-[#3A2530]"
            aria-label="Wishlist, 3 items"
          >
            <Heart size={15} className="text-[#FF5FA2]" />
            <span
              className="absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF5FA2] font-sans text-[9px] font-bold text-white"
              aria-hidden
            >
              3
            </span>
          </Button>

          <MobileNavSheet
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            pathname={pathname}
          />
        </div>
      </Container>
    </header>
  );
}
