import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export function TopBrandsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading featured brands"
      className="bg-[#FFF9FC] py-16 sm:py-20 lg:py-24 dark:bg-[#1A0D13]"
    >
      <Container>
        <div className="mb-14 text-center">
          <Skeleton className="mx-auto mb-2.5 h-3 w-32 rounded-full" />
          <Skeleton className="mx-auto h-10 w-64 rounded-xl sm:h-12" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-36 rounded-2xl sm:h-48"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
