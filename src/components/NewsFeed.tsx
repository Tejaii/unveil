import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, ChevronDown, Calendar } from 'lucide-react';
import { topicFeeds } from '@/components/constants/topicFeeds';

export const NewsFeed = ({ userProfile }) => {
  const [aiEnhanced, setAiEnhanced] = useState(true);
  const [briefingExpanded, setBriefingExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSelectedTopics = () => {
    if (userProfile?.topics?.length) return userProfile.topics;
    const guestTopics = localStorage.getItem('unveil_guest_topics');
    return guestTopics ? JSON.parse(guestTopics) : [];
  };

  const getTodaysBriefing = () => {
    return [
      "AI breakthrough in reasoning capabilities shows 40% improvement over previous models",
      "Global climate agreement secures $100B fund for clean energy transitions",
      "Tech sector volatility continues with 15% average decline in major stocks",
      "New study reveals promising results for renewable energy storage solutions"
    ];
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const selectedTopics = getSelectedTopics();
      let rssUrls = [];

      selectedTopics.forEach(topic => {
        if (topicFeeds[topic]) {
          rssUrls.push(...topicFeeds[topic]);
        }
      });

      const randomFeeds = rssUrls.sort(() => 0.5 - Math.random()).slice(0, 5);
      const fetchedArticles = [];

      for (const feedUrl of randomFeeds) {
        try {
          const res = await fetch(`/api/rss-proxy?url=${encodeURIComponent(feedUrl)}`);
          const feed = await res.json();

          feed.items.slice(0, 3).forEach(item => {
            fetchedArticles.push({
              title: item.title,
              summary: item.contentSnippet || item.content || '',
              url: item.link,
              date: item.pubDate,
              source: feed.title,
              image: item.enclosure?.url || '',
              category: selectedTopics.find(topic =>
                topicFeeds[topic]?.includes(feedUrl)
              ) || 'General',
              sentiment: 'neutral',
            });
          });
        } catch (err) {
          console.error('Error fetching RSS feed:', feedUrl, err);
        }
      }

      setArticles(fetchedArticles.sort(() => 0.5 - Math.random()));
      setLoading(false);
    };

    fetchArticles();
  }, [userProfile]);

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
          <div className="text-center py-10 text-gray-500">Loading personalized news...</div>
        ) : (
          articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              aiEnhanced={aiEnhanced}
              userProfile={userProfile}
            />
          ))
        )}
      </div>

      {/* Load More (optional placeholder button) */}
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
