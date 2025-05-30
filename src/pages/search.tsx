import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue"; // import it

type Article = {
  id: string;
  title: string;
  summary: string;
};

const fetchSearchResults = async (query: string): Promise<Article[]> => {
  if (!query) return [];
  await new Promise((res) => setTimeout(res, 700));
  return Array.from({ length: 4 }, (_, i) => ({
    id: `${query}-${i}`,
    title: `Result ${i + 1} for "${query}"`,
    summary: `This is a brief summary of result ${i + 1}.`,
  }));
};

const Search = () => {
  const [input, setInput] = useState("");
  const debouncedQuery = useDebouncedValue(input, 500); // ⏳ debounce here

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Search Articles</h1>
      <Input
        placeholder="Search for tech news..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[80px] w-full rounded-xl" />
          ))
        ) : data && data.length > 0 ? (
          data.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-muted-foreground text-sm">
                  {article.summary}
                </p>
              </CardContent>
            </Card>
          ))
        ) : debouncedQuery ? (
          <p className="text-muted-foreground">No results found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
