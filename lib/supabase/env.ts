const SUPABASE_ENV_VARS = {
  url: "NEXT_PUBLIC_SUPABASE_URL",
  anonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
} as const

function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Add it to .env.local (see .env.example). ` +
        `Get values from Supabase Dashboard → Project Settings → API.`,
    )
  }

  return value
}

export function getSupabaseEnv() {
  return {
    url: requireEnv(SUPABASE_ENV_VARS.url),
    anonKey: requireEnv(SUPABASE_ENV_VARS.anonKey),
  } as const
}
