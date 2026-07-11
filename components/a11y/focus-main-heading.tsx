"use client";

import { useEffect, useRef } from "react";

type FocusMainHeadingProps = {
  children: React.ReactNode;
  className?: string;
  tabIndex?: number;
};

export function FocusMainHeading({
  children,
  className,
  tabIndex = -1,
}: FocusMainHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <h1 ref={ref} tabIndex={tabIndex} className={className}>
      {children}
    </h1>
  );
}
