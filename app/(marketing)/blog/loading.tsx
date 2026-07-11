import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]" aria-busy="true" aria-label="Loading blog">
      <Skeleton className="h-56 w-full rounded-none sm:h-64 lg:h-72" />

      <Container className="py-10">
        <Skeleton className="mb-8 h-64 w-full rounded-3xl" />
        <div className="mb-10 flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="mb-8 h-8 w-48 rounded-lg" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-[#FFD6E8]/60 bg-white dark:border-[#3A2530] dark:bg-[#2A1520]"
            >
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
