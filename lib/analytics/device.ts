import type { DeviceType } from "@/types/analytics";

export function parseDeviceType(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(ua)) {
    return "tablet";
  }

  if (
    /mobile|iphone|ipod|android.*mobile|windows phone|blackberry|opera mini|iemobile/.test(
      ua
    )
  ) {
    return "mobile";
  }

  return "desktop";
}

type CountryHeaders = {
  get(name: string): string | null;
};

export function parseCountry(headers: CountryHeaders): string | null {
  const country =
    headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry");

  if (!country?.trim()) {
    return null;
  }

  return country.trim().toUpperCase();
}
