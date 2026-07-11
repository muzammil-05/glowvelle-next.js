import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  className?: string;
  center?: boolean;
  headingId?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  className = "",
  center = false,
  headingId,
}: SectionHeaderProps) {
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="font-display text-3xl leading-[1.1] font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
      >
        {heading}
      </h2>
    </div>
  );
}
