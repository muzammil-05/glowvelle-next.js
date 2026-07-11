import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type ContainerProps = ComponentProps<"div">;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
