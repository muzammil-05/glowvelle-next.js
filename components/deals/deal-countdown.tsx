"use client";

import { useEffect, useState } from "react";

type DealCountdownProps = {
  initial: readonly [string, string, string] | [number, number, number];
  className?: string;
  valueClassName?: string;
  separatorClassName?: string;
};

function normalizeTime(
  initial: readonly [string, string, string] | [number, number, number]
): [string, string, string] {
  return initial.map((value) =>
    typeof value === "number" ? String(value).padStart(2, "0") : value
  ) as [string, string, string];
}

export function DealCountdown({
  initial,
  className = "flex items-center gap-0.5",
  valueClassName = "font-display text-[15px] font-bold text-[#2F2F2F] dark:text-white",
  separatorClassName = "mx-0.5 text-[15px] font-bold text-[#FF5FA2]",
}: DealCountdownProps) {
  const [time, setTime] = useState<[string, string, string]>(() =>
    normalizeTime(initial)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const seconds = parseInt(prev[2], 10) - 1;
        if (seconds >= 0) {
          return [prev[0], prev[1], String(seconds).padStart(2, "0")];
        }

        const minutes = parseInt(prev[1], 10) - 1;
        if (minutes >= 0) {
          return [prev[0], String(minutes).padStart(2, "0"), "59"];
        }

        const hours = parseInt(prev[0], 10) - 1;
        if (hours >= 0) {
          return [String(hours).padStart(2, "0"), "59", "59"];
        }

        return ["00", "00", "00"];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className} aria-live="polite" aria-label="Deal countdown timer">
      {time.map((value, index) => (
        <span key={index} className="flex items-center">
          <span className={valueClassName}>{value}</span>
          {index < 2 && <span className={separatorClassName}>:</span>}
        </span>
      ))}
    </div>
  );
}
