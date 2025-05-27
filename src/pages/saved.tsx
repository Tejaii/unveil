"use client";

import { useQuery } from "@tanstack/react-query";
import { BookmarkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock fetcher function — replace with actual endpoint
const fetchSavedArticles = async () => {
  const response = await fetch("/api/saved");
  if (!response.ok) {
    throw new Error("Failed to fetch saved articles");
  }
  return response.json();
};

type Article = {
  id: string | number;
  title: string;
  source: string;
  date: string;
  tags?: string[];
  url?: string; // Optional external or internal link
};

const Saved = () => {
  const { data, isLoading, isError } = useQuery<Article[]>({
    queryKey: ["saved-articles"],
    queryFn: fetchSavedArticles,
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError || !data?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-muted-foreground">
        <BookmarkIcon className="w-10 h-10 mb-4" />
        <span>No saved articles found.</span>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((article: Article) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="transition hover:shadow-xl h-full">
            <CardContent className="p-5 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold leading-tight hover:underline">
                  <a
                    href={article.url || `/article/${article.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {article.source} ·{" "}
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <Separator className="my-2" />
              </div>

              {article.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Badge variant="secondary">Uncategorized</Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Saved;
