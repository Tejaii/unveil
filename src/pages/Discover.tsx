"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flame } from "lucide-react";

// Mock discover articles
const discoverArticles = [
  {
    id: 1,
    title: "Breakthrough in Quantum Computing Promises Faster AI Training",
    source: "MIT Technology Review",
    date: "2024-03-12T09:00:00Z",
    tags: ["Tech", "AI", "Quantum"],
    url: "https://example.com/article1",
  },
  {
    id: 2,
    title: "Global Renewable Energy Investment Hits Record High",
    source: "Bloomberg",
    date: "2024-03-10T11:15:00Z",
    tags: ["Climate", "Finance"],
    url: "https://example.com/article2",
  },
  {
    id: 3,
    title: "Open Source Tools Gain Momentum in AI Research",
    source: "The Verge",
    date: "2024-03-08T14:45:00Z",
    tags: ["Open Source", "ML"],
    url: "https://example.com/article3",
  },
];

const Discover = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-600" />
        <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {discoverArticles.map((article) => (
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
                    {article.source} · {" "}
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
    </div>
  );
};

export default Discover;
