"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_SUBJECTS } from "@/lib/mock/contact";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const fieldClassName =
  "h-auto rounded-xl border-[#FFD6E8] bg-[#FFF9FC] px-4 py-3 font-sans text-[13px] text-[#2F2F2F] placeholder-[#9B8B97] focus-visible:border-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] dark:border-[#3A2530] dark:bg-[#1A0D13] dark:text-white";

const labelClassName =
  "mb-1.5 block font-sans text-[12px] font-semibold text-[#2F2F2F] dark:text-white";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please enter your message.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const updateField = (key: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-3xl border border-[#FFD6E8] bg-white p-6 dark:border-[#3A2530] dark:bg-[#2A1520] sm:p-10"
        role="status"
        aria-live="polite"
      >
        <div className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFEAF4]">
            <Check size={36} className="text-[#FF5FA2]" aria-hidden />
          </div>
          <h2 className="mb-3 font-display text-[32px] font-bold text-[#2F2F2F] dark:text-white">
            Message Sent!
          </h2>
          <p className="mx-auto max-w-sm font-sans text-[14px] leading-relaxed text-[#9B8B97] dark:text-white/60">
            Thank you for reaching out. Our team will get back to you within 24
            hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#FFD6E8] bg-white p-6 dark:border-[#3A2530] dark:bg-[#2A1520] sm:p-10">
      <h2 className="mb-7 font-display text-[28px] font-bold text-[#2F2F2F] dark:text-white">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact-name" className={labelClassName}>
              Full Name
            </Label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={cn(fieldClassName, errors.name && "border-destructive")}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 font-sans text-[11px] text-destructive">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-email" className={labelClassName}>
              Email Address
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="hello@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={cn(fieldClassName, errors.email && "border-destructive")}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 font-sans text-[11px] text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="contact-subject" className={labelClassName}>
            Subject
          </Label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            aria-label="Message subject"
            className={cn(
              fieldClassName,
              "w-full appearance-none focus:outline-none"
            )}
          >
            <option value="">Select a subject</option>
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-7">
          <Label htmlFor="contact-message" className={labelClassName}>
            Message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell us how we can help..."
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(
              fieldClassName,
              "min-h-[120px] resize-none",
              errors.message && "border-destructive"
            )}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 font-sans text-[11px] text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="flex h-auto w-full items-center justify-center gap-2 rounded-xl bg-[#FF5FA2] py-4 font-sans text-[14px] font-semibold text-white hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2"
        >
          <Send size={15} aria-hidden />
          Send Message
        </Button>
      </form>
    </div>
  );
}
