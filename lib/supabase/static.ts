import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "./env";

let staticClient: SupabaseClient | undefined;

/** Cookie-free client for public read queries (SSG, generateStaticParams, layouts). */
export function createStaticClient() {
  if (staticClient) {
    return staticClient;
  }

  const { url, anonKey } = getSupabaseEnv();
  staticClient = createSupabaseClient(url, anonKey);

  return staticClient;
}
