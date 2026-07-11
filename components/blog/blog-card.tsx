import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";

import { getBlogHref } from "@/lib/blog/utils";
import { unsplashImage } from "@/lib/images";
import type { BlogPost } from "@/types";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const href = getBlogHref(post);

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-[#FFD6E8] bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]">
        <Link href={href} className="grid min-h-64 grid-cols-1 text-left sm:min-h-80 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative h-48 overflow-hidden bg-[#FFD6E8] sm:h-auto">
            <Image
              src={unsplashImage(post.image, 680, 320)}
              alt={post.title}
              width={680}
              height={320}
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-5 left-5">
              <span className="rounded-full bg-[#FF5FA2] px-3 py-1.5 font-sans text-[10px] font-bold text-white">
                Featured
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-[#FFEAF4] px-2.5 py-1 font-sans text-[10px] font-bold text-[#FF5FA2]">
                {post.category}
              </span>
              <span className="flex items-center gap-1 font-sans text-[11px] text-[#9B8B97]">
                <Clock size={10} aria-hidden />
                {post.readTime}
              </span>
            </div>
            <h2 className="mb-3 font-display text-xl leading-tight font-bold text-[#2F2F2F] transition-colors group-hover:text-[#FF5FA2] sm:text-2xl lg:text-[30px] dark:text-white">
              {post.title}
            </h2>
            <p className="mb-5 line-clamp-3 font-sans text-[13px] leading-relaxed text-[#9B8B97] dark:text-white/55">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-[#FFD6E8]">
                <Image
                  src={unsplashImage(post.authorAvatar, 36, 36)}
                  alt={post.author}
                  width={36}
                  height={36}
                  sizes="36px"
                  quality={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-sans text-[12px] font-semibold text-[#2F2F2F] dark:text-white">
                  {post.author}
                </div>
                <div className="font-sans text-[11px] text-[#9B8B97]">{post.date}</div>
              </div>
              <span className="ml-auto flex items-center gap-1 font-sans text-[12px] font-semibold text-[#FF5FA2]">
                Read More
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-[#FFD6E8] bg-white text-left transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]">
      <Link href={href} className="relative block h-48 overflow-hidden bg-[#FFD6E8]">
        <Image
          src={unsplashImage(post.image, 400, 192)}
          alt={post.title}
          width={400}
          height={192}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-[#FFEAF4]/90 px-2.5 py-1 font-sans text-[10px] font-bold text-[#FF5FA2] backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <Clock size={10} className="text-[#9B8B97]" aria-hidden />
          <span className="font-sans text-[11px] text-[#9B8B97]">{post.readTime}</span>
          <span className="text-[10px] text-[#9B8B97]">·</span>
          <span className="font-sans text-[11px] text-[#9B8B97]">{post.date}</span>
        </div>
        <h3 className="mb-2 flex-1 font-display text-[19px] leading-snug font-bold text-[#2F2F2F] transition-colors group-hover:text-[#FF5FA2] dark:text-white">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="mb-4 line-clamp-2 font-sans text-[12px] leading-relaxed text-[#9B8B97] dark:text-white/50">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2.5 border-t border-[#FFD6E8]/60 pt-4 dark:border-[#3A2530]">
          <div className="h-7 w-7 overflow-hidden rounded-full bg-[#FFD6E8]">
            <Image
              src={unsplashImage(post.authorAvatar, 28, 28)}
              alt={post.author}
              width={28}
              height={28}
              sizes="28px"
              quality={80}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-sans text-[11px] font-medium text-[#2F2F2F] dark:text-white">
            {post.author}
          </span>
          <Link
            href={href}
            className="ml-auto flex items-center gap-1 font-sans text-[12px] font-semibold text-[#FF5FA2] transition-colors hover:text-[#FF7DB6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5FA2]"
          >
            Read More
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
