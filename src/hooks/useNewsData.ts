import { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  summary: string;
  image: string;
  date: string;
  source: string;
  url: string;
  category?: string;
  sentiment?: string;
}

export function useNewsData(category: string = "top", language: string = "en") {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${import.meta.env.VITE_NEWS_API_KEY}&category=${category}&language=${language}`
        );

        const data = await res.json();

        if (data.status === "success" && Array.isArray(data.results)) {
          type NewsApiResult = {
            title?: string;
            description?: string;
            image_url?: string;
            pubDate?: string;
            source_id?: string;
            link?: string;
          };

          const normalized = data.results.map((item: NewsApiResult) => ({
            title: item.title || "Untitled",
            summary: item.description || item.title || "No summary available.",
            image: item.image_url || "", // Add fallback image if desired
            date: item.pubDate || "",
            source: item.source_id || "Unknown Source",
            url: item.link || "#",
            category: category,
            sentiment: "neutral", // Default for now — enhance later with AI
          }));

          setArticles(normalized);
        } else {
          throw new Error("Failed to fetch news");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, language]);

  return { articles, loading, error };
}
