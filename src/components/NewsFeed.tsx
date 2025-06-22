import React, { useEffect, useState } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, ChevronDown, Calendar } from 'lucide-react';
import { topicFeeds } from '@/components/constants/topicFeeds'; // make sure path is right

export const NewsFeed = ({ userProfile }) => {
  const [aiEnhanced, setAiEnhanced] = useState(true);
  const [briefingExpanded, setBriefingExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = 'AI & Machine Learning'; // ← You can later get this from user profile
  const feeds = topicFeeds[selectedCategory];

  const getTodaysBriefing = () => [
    "AI breakthrough in reasoning capabilities shows 40% improvement...",
    "Global climate agreement secures $100B...",
    "Tech sector volatility continues...",
    "Promising results for renewable storage...",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const allArticles = [];

        for (let i = 0; i < Math.min(3, feeds.length); i++) { // Limit to 3 feeds for performance
          const res = await fetch(`/api/rss-proxy?url=${encodeURIComponent(feeds[i])}`);
          const data = await res.json();

          allArticles.push(...data.map((item: any) => ({
            title: item.title,
            summary: item.contentSnippet || item.content || item.title,
            source: item?.creator || new URL(item.link).hostname,
            date: item.pubDate,
            readTime: '3 min read', // You can improve this later
            category: selectedCategory,
            sentiment: 'neutral',   // Optionally run AI sentiment here
            url: item.link,
            image: item.enclosure?.url || '/placeholder.png',
          })));
        }

        setArticles(allArticles);
      } catch (err) {
        console.error('Failed to load RSS feeds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [feeds]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">For You</h1>
          <p className="text-gray-400">Personalized for {userProfile?.userType || 'you'}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">AI Enhanced</span>
            <Switch 
              checked={aiEnhanced} 
              onCheckedChange={setAiEnhanced}
              className="data-[state=checked]:bg-gray-700"
            />
            <Brain className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Today's Briefing */}
      <Card className="bg-[#1e1e1e] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-300" />
              <CardTitle className="text-lg text-gray-100">Today's Briefing</CardTitle>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBriefingExpanded(!briefingExpanded)}
              className="text-gray-400 hover:bg-gray-800"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${briefingExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        {briefingExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              {getTodaysBriefing().map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* News Feed */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400">Loading articles...</p>
        ) : (
          articles.map((article, idx) => (
            <NewsCard
              key={idx}
              article={article}
              aiEnhanced={aiEnhanced}
              userProfile={userProfile}
            />
          ))
        )}
      </div>

      {/* Load More Placeholder */}
      <div className="text-center py-8">
        <Button
          variant="outline"
          className="bg-[#2e2e2e] border-gray-700 hover:bg-gray-800 text-gray-300"
        >
          Load More Articles
        </Button>
      </div>
    </div>
  );
};
