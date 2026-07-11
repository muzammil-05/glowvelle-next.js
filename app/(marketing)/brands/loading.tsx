import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandsLoading() {
  return (
    <div
      className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]"
      aria-busy="true"
      aria-label="Loading brands"
    >
      <Skeleton className="h-64 w-full rounded-none sm:h-72 lg:h-80" />

      <Container className="py-10">
        <Skeleton className="mb-8 h-4 w-40 rounded-full" />
        <Skeleton className="mb-10 h-14 w-full max-w-lg rounded-2xl" />
        <Skeleton className="mb-10 h-10 w-full rounded-xl" />

        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-56 rounded-3xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 pb-16 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
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
