import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Clock, Heart, MessageCircle, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  positive_reactions_count: number;
  comments_count: number;
  tag_list: string[];
  user: {
    name: string;
    profile_image_90: string;
  };
}

const TAGS = ["All", "JavaScript", "TypeScript", "React", "Node.js", "AI", "Web Dev", "Career"];

const TAG_QUERY_MAP: Record<string, string> = {
  All: "",
  JavaScript: "javascript",
  TypeScript: "typescript",
  React: "react",
  "Node.js": "node",
  AI: "ai",
  "Web Dev": "webdev",
  Career: "career",
};

async function fetchArticles(tag: string): Promise<DevToArticle[]> {
  const params = new URLSearchParams({ per_page: "24", top: "7" });
  if (tag) params.set("tag", tag);
  const res = await fetch(`https://dev.to/api/articles?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

function ArticleCard({ article, index }: { article: DevToArticle; index: number }) {
  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`card-article-${article.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className="group flex flex-col rounded-xl border border-border/40 bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      {article.cover_image ? (
        <div className="overflow-hidden h-44 bg-muted">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-44 bg-gradient-to-br from-primary/10 to-background flex items-center justify-center">
          <span className="text-4xl font-serif text-primary/30 select-none">
            {article.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {article.tag_list.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {article.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30 mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={article.user.profile_image_90}
              alt={article.user.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {article.user.name}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.reading_time_minutes}m
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {article.positive_reactions_count}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {article.comments_count}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border/40 bg-card overflow-hidden animate-pulse">
      <div className="h-44 bg-muted" />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex gap-1.5">
          <div className="h-4 w-16 rounded-full bg-muted" />
          <div className="h-4 w-12 rounded-full bg-muted" />
        </div>
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="flex justify-between pt-2 border-t border-border/30">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");

  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ["dev-to-articles", activeTag],
    queryFn: () => fetchArticles(TAG_QUERY_MAP[activeTag]),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Back link */}
      <div className="container mx-auto px-6 md:px-12 mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 md:px-12 mb-12"
      >
        <p className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-4">
          &gt;_ Tech Pulse
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Blogs &amp; News
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Curated developer articles from the community — filtered by the topics that matter.
        </p>
      </motion.div>

      {/* Tag filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="container mx-auto px-6 md:px-12 mb-10"
      >
        <div className="flex flex-wrap gap-2" data-testid="tag-filter-group">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              data-testid={`button-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="container mx-auto px-6 md:px-12">
        {isError && (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">Could not load articles. Check your connection and try again.</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeTag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {articles?.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
