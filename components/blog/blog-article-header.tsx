import type { BlogPost } from "@/types";

type BlogArticleHeaderProps = {
  post: BlogPost;
};

export function BlogArticleHeader({ post }: BlogArticleHeaderProps) {
  return (
    <header className="mt-8 max-w-3xl">
      <span className="mb-5 inline-block rounded-full bg-[#FF5FA2] px-3 py-1.5 font-sans text-[10px] font-bold text-white">
        {post.category}
      </span>
      <h1 className="font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white">
        {post.title}
      </h1>
    </header>
  );
}
