import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 font-sans text-[12px] text-[#9B8B97]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={11} aria-hidden />}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[#FF5FA2] focus-visible:text-[#FF5FA2] focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="font-medium text-[#2F2F2F] dark:text-white"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
