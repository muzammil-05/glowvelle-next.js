import { Container } from "@/components/layout/container";

export default function DealsLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <div className="h-80 animate-pulse bg-[#FFEAF4] dark:bg-[#2A1520]" />
      <Container className="py-10">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-[#FFEAF4] dark:bg-[#2A1520]" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-3xl bg-[#FFEAF4] dark:bg-[#2A1520]"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
