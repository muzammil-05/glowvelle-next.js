import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

import { unsplashImage } from "@/lib/images";
import type { BlogPost } from "@/types";

type BlogArticleMetaProps = {
  post: BlogPost;
};

export function BlogArticleMeta({ post }: BlogArticleMetaProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 border-b border-[#FFD6E8] pb-8 dark:border-[#3A2530]">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-[#FFD6E8]">
          <Image
            src={unsplashImage(post.authorAvatar, 56, 56)}
            alt={post.author}
            width={56}
            height={56}
            sizes="56px"
            quality={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-sans text-[11px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
            Author
          </p>
          <p className="font-sans text-[15px] font-semibold text-[#2F2F2F] dark:text-white">
            {post.author}
          </p>
        </div>
      </div>

      <div>
        <p className="mb-1 flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
          <Calendar size={12} aria-hidden />
          Publish Date
        </p>
        <time
          dateTime={post.date}
          className="font-sans text-[14px] text-[#2F2F2F] dark:text-white"
        >
          {post.date}
        </time>
      </div>

      <div>
        <p className="mb-1 flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
          <Clock size={12} aria-hidden />
          Reading Time
        </p>
        <p className="font-sans text-[14px] text-[#2F2F2F] dark:text-white">
          {post.readTime}
        </p>
      </div>

      {post.tags.length > 0 && (
        <div className="ml-auto flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#FFEAF4] px-2.5 py-1 font-sans text-[10px] text-[#FF5FA2] dark:bg-[#3A2530]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
