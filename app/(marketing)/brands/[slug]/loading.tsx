import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandDetailLoading() {
  return (
    <div
      className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]"
      aria-busy="true"
      aria-label="Loading brand"
    >
      <Skeleton className="h-[280px] w-full rounded-none sm:h-[360px] lg:h-[420px]" />

      <Container className="py-10">
        <Skeleton className="mb-8 h-4 w-56 rounded-full" />
        <Skeleton className="mb-10 h-32 w-full rounded-2xl" />
        <Skeleton className="mb-10 h-48 w-full rounded-2xl" />

        <div className="mb-10">
          <Skeleton className="mb-6 h-8 w-48 rounded-xl" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#FFD6E8]/60 bg-white dark:border-[#3A2530] dark:bg-[#2A1520]"
              >
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-3 w-16 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-[#FFD6E8]/60 bg-white dark:border-[#3A2530] dark:bg-[#2A1520]"
            >
              <Skeleton className="h-52 w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
