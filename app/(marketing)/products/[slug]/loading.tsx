import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]" aria-busy="true" aria-label="Loading product">
      <Container className="py-8">
        <Skeleton className="mb-8 h-4 w-64 rounded-full" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <Skeleton className="mb-4 h-64 w-full rounded-3xl sm:h-80 lg:h-[500px]" />
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-10 w-full max-w-lg rounded-2xl" />
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </Container>
    </div>
  );
}
