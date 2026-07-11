import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-[#FFD6E8]/60 dark:bg-[#3A2530]/60",
        className
      )}
      aria-hidden
      {...props}
    />
  );
}

export { Skeleton };
