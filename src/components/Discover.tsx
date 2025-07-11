"use client";

import { useRef, useCallback } from "react";
import { Flame } from "lucide-react";
import { useNewsData } from "@/hooks/useNewsData";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";

const Discover = () => {
  const { articles, loading, error, loadMore } = useNewsData("technology");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadMore]
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-600" />
        <h1 className="text-2xl font-bold text-foreground">Discover</h1>
      </div>

      {loading && !articles.length && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm">Failed to load: {error}</p>
      )}

      <div className="w-full flex flex-col gap-6">
        {articles.map((article) => (
          <NewsCard key={article.title} article={article} aiEnhanced={false} userProfile={null} />
        ))}

        {/* Infinite scroll loader */}
        {!error && (
          <div ref={loaderRef} className="py-4 text-center">
            {loading && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;