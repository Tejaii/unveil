"use client";

import { Flame } from "lucide-react";
import { useNewsData } from "@/hooks/useNewsData";
import { NewsCard } from "@/components/NewsCard";

const Discover = () => {
  const { articles, loading, error } = useNewsData("technology"); // You can change this to dynamic category if needed

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover</h1>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-muted-foreground text-sm">Loading articles...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 text-sm">Failed to load: {error}</p>
      )}

      {/* Articles */}
      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col gap-6">
        {articles.map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}
      </div>

    </div>
  );
};

export default Discover;
