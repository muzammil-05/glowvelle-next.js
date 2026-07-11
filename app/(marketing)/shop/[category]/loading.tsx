import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div
      className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]"
      aria-busy="true"
      aria-label="Loading category"
    >
      <Skeleton className="h-96 w-full rounded-none" />

      <Container className="py-8">
        <Skeleton className="mb-6 h-4 w-48 rounded-full" />
        <Skeleton className="mb-4 h-4 w-full max-w-3xl rounded-lg" />
        <Skeleton className="mb-4 h-4 w-full max-w-2xl rounded-lg" />
        <Skeleton className="h-14 w-full max-w-2xl rounded-2xl" />
      </Container>

      <Container className="flex flex-col gap-6 py-8 sm:py-10 lg:flex-row lg:gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="rounded-2xl border border-[#FFD6E8] bg-white p-6 dark:border-[#3A2530] dark:bg-[#2A1520]">
            <Skeleton className="mb-6 h-5 w-24 rounded-lg" />
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="mb-3 h-4 w-full rounded-lg" />
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-7 flex items-center justify-between">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
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
      </Container>
    </div>
  );
}
