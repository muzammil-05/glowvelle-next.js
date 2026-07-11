const isDev = process.env.NODE_ENV === "development";

/** Discriminated result wrapper for optional explicit error propagation. */
export type DataResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export function logDbError(context: string, err: unknown): void {
  if (!isDev) return;

  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : String(err);

  console.error(`[${context}]`, message);
}

/**
 * Wraps async DAL calls with try/catch and dev-only logging.
 * Returns `fallback` on thrown errors.
 */
export async function safeQuery<T>(
  context: string,
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    logDbError(context, err);
    return fallback;
  }
}

/** Logs Supabase PostgREST errors in dev; returns true when an error was handled. */
export function handleDbError(
  context: string,
  error: { message: string } | null
): boolean {
  if (!error) return false;
  logDbError(context, error.message);
  return true;
}
