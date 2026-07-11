import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogArticleLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]" aria-busy="true" aria-label="Loading article">
      <Skeleton className="h-72 w-full rounded-none sm:h-80 lg:h-96" />

      <Container className="py-10">
        <Skeleton className="mb-8 h-4 w-56 rounded-full" />
        <Skeleton className="mb-4 h-4 w-32 rounded-full" />
        <Skeleton className="mb-6 h-12 w-full max-w-3xl rounded-2xl" />
        <Skeleton className="mb-10 h-4 w-48 rounded-full" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </aside>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full rounded-lg" />
            ))}
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
        </div>
      </Container>
    </div>
  );
}
