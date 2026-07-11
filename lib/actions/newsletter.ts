"use server";

import { createClient } from "@/lib/supabase/server";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export type NewsletterSubscribeResult = {
  success: boolean;
  error?: string;
  alreadySubscribed?: boolean;
};

export async function subscribeToNewsletter(
  email: string,
  source?: string
): Promise<NewsletterSubscribeResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    return {
      success: false,
      error: "Please enter a valid email address.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: normalizedEmail,
      source: source?.trim() || "website",
      consent_marketing: true,
    });

    if (error) {
      if (error.code === "23505") {
        return {
          success: true,
          alreadySubscribed: true,
        };
      }

      console.error("[subscribeToNewsletter]", error.message);
      return {
        success: false,
        error: "Something went wrong. Please try again in a moment.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[subscribeToNewsletter]", err);
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}
