import Image from "next/image";

import { unsplashImage } from "@/lib/images";
import type { BlogPost } from "@/types";

type BlogFeaturedImageProps = {
  post: BlogPost;
};

export function BlogFeaturedImage({ post }: BlogFeaturedImageProps) {
  return (
    <div className="relative h-56 overflow-hidden bg-[#FFD6E8] sm:h-72 lg:h-[480px]">
      <Image
        src={unsplashImage(post.image, 1440, 480)}
        alt={post.title}
        width={1440}
        height={480}
        priority
        sizes="100vw"
        quality={80}
        className="h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2F2F2F]/40 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
