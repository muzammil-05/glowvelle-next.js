import { Star } from "lucide-react";

type StarsProps = {
  rating: number;
  size?: number;
};

export function Stars({ rating, size = 12 }: StarsProps) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          aria-hidden
          className={
            i <= Math.round(rating)
              ? "fill-[#D8B36A] text-[#D8B36A]"
              : "fill-gray-200 text-gray-300"
          }
        />
      ))}
    </div>
  );
}
