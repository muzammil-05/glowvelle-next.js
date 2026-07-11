import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySectionSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading categories"
      className="bg-[#FFF9FC] py-16 sm:py-20 lg:py-24 dark:bg-[#1A0D13]"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="mb-2.5 h-3 w-32 rounded-full" />
            <Skeleton className="mb-2 h-10 w-64 rounded-xl" />
            <Skeleton className="h-10 w-48 rounded-xl" />
          </div>
          <Skeleton className="h-4 w-36 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-[3/4] w-full rounded-2xl"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
