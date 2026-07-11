import type { Deal } from "@/types";

export type FlashDeal = Deal & {
  timeLeft: [number, number, number];
};

export const LIMITED_TIME_ENDS_IN = ["02", "47", "33"] as const;

export const FLASH_DEAL_LABELS = [
  "Flash Deal",
  "Hot Deal",
  "Weekend Special",
] as const;

export const FEATURED_DEAL_LABELS = [
  "Editor's Pick",
  "Luxury Deal",
  "Viral Pick",
] as const;

export const DEFAULT_FLASH_TIME_LEFT: [number, number, number] = [2, 47, 33];

export const FLASH_TIME_LEFT_VARIANTS: [number, number, number][] = [
  [2, 47, 33],
  [5, 12, 8],
  [23, 59, 59],
];
