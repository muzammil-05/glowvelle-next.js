"use client";

import dynamic from "next/dynamic";

export const LazyNewsletter = dynamic(
  () => import("./newsletter").then((mod) => mod.Newsletter),
  { ssr: false, loading: () => null }
);
