import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]" aria-busy="true" aria-label="Loading page">
      <div className="relative overflow-hidden bg-[#FFD6E8]/40 dark:bg-[#2A1520]/40">
        <Container className="py-16 sm:py-20">
          <Skeleton className="mb-4 h-8 w-48 rounded-full" />
          <Skeleton className="mb-3 h-12 w-full max-w-xl rounded-2xl" />
          <Skeleton className="mb-8 h-12 w-full max-w-lg rounded-2xl" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-32 rounded-full" />
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-10 w-64 rounded-2xl" />
          </div>
          <Skeleton className="hidden h-4 w-28 rounded-full sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#FFD6E8]/60 bg-white dark:border-[#3A2530] dark:bg-[#2A1520]"
            >
              <Skeleton className="h-56 w-full rounded-none" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-3 w-16 rounded-full" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
