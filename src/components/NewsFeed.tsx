import React, { useEffect, useState } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, ChevronDown, Calendar, Settings, RefreshCw } from 'lucide-react';
import { topicFeeds } from '@/components/constants/topicFeeds';
import { useAuth } from './auth/AuthProvider';

export const NewsFeed = ({ userProfile }) => {
  const [aiEnhanced, setAiEnhanced] = useState(true);
  const [briefingExpanded, setBriefingExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { user } = useAuth();

  // Get user's selected topics from profile or localStorage
  useEffect(() => {
    let userTopics = [];
    
    if (userProfile?.interests) {
      userTopics = userProfile.interests;
    } else if (user?.user_metadata?.topics) {
      userTopics = user.user_metadata.topics;
    } else {
      // Fallback to localStorage for guest users
      const savedTopics = localStorage.getItem('unveil_guest_topics');
      if (savedTopics) {
        userTopics = JSON.parse(savedTopics);
      } else {
        // Default topics if no preferences found
        userTopics = ['AI & Machine Learning', 'Technology'];
      }
    }
    
    setSelectedTopics(userTopics);
  }, [userProfile, user]);

  const getTodaysBriefing = () => [
    "AI breakthrough in reasoning capabilities shows 40% improvement...",
    "Global climate agreement secures $100B funding...",
    "Tech sector volatility continues amid regulatory changes...",
    "Promising results for renewable energy storage solutions...",
  ];

  useEffect(() => {
    if (selectedTopics.length === 0) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const allArticles = [];

        // Fetch articles from all selected topics
        for (const topic of selectedTopics) {
          const feeds = topicFeeds[topic];
          if (!feeds || feeds.length === 0) continue;

          // Limit to 2-3 feeds per topic to avoid overwhelming the user
          const feedsToFetch = feeds.slice(0, 3);

          for (const feedUrl of feedsToFetch) {
            try {
              const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rss-proxy?url=${encodeURIComponent(feedUrl)}`;
              
              const headers = {
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              };

              const res = await fetch(apiUrl, { headers });
              
              if (!res.ok) {
                console.error(`Failed to fetch from ${feedUrl}: ${res.status}`);
                continue;
              }

              const data = await res.json();

              // Add articles with topic information
              const topicArticles = data.slice(0, 5).map((item: any) => ({
                title: item.title,
                summary: item.contentSnippet || item.content || item.title,
                source: item?.creator || new URL(item.link).hostname,
                date: item.pubDate,
                readTime: '3 min read',
                category: topic,
                sentiment: 'neutral',
                url: item.link,
                // Only include image if it exists in the RSS feed
                image: item.enclosure?.url || null,
              }));

              allArticles.push(...topicArticles);
            } catch (feedError) {
              console.error(`Error fetching feed ${feedUrl}:`, feedError);
            }
          }
        }

        // Shuffle articles to mix topics and limit total
        const shuffledArticles = allArticles
          .sort(() => Math.random() - 0.5)
          .slice(0, 20); // Limit to 20 articles total

        setArticles(shuffledArticles);
      } catch (err) {
        console.error('Failed to load RSS feeds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedTopics]);

  const handleTopicToggle = (topic) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    
    setSelectedTopics(newTopics);
    
    // Save to localStorage for persistence
    localStorage.setItem('unveil_guest_topics', JSON.stringify(newTopics));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">For You</h1>
          <p className="text-muted-foreground mt-2">
            Personalized for {userProfile?.userType || 'you'} • {selectedTopics.length} topics
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-medium">AI Enhanced</span>
            <Switch 
              checked={aiEnhanced} 
              onCheckedChange={setAiEnhanced}
              className="data-[state=checked]:bg-accent"
            />
            <Brain className="w-5 h-5 text-accent" />
          </div>
        </div>
      </div>

      {/* Topic Preferences */}
      <Card className="news-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-accent" />
            <CardTitle className="text-foreground">Your Topics</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.keys(topicFeeds).map((topic) => (
              <Badge
                key={topic}
                className={`cursor-pointer px-4 py-2 rounded-full transition-all font-medium ${
                  selectedTopics.includes(topic)
                    ? 'bg-accent text-primary-foreground'
                    : 'pill-badge hover:bg-accent hover:text-primary-foreground'
                }`}
                onClick={() => handleTopicToggle(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Click topics to customize your feed • {selectedTopics.length} selected
          </p>
        </CardContent>
      </Card>

      {/* Today's Briefing */}
      <Card className="news-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <CardTitle className="text-foreground">Today's Briefing</CardTitle>
              <Badge className="pill-badge">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBriefingExpanded(!briefingExpanded)}
              className="text-muted-foreground hover:text-foreground rounded-lg"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${briefingExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        {briefingExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {getTodaysBriefing().map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* News Feed */}
      <div className="space-y-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="news-card animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-32 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <NewsCard
                key={`${article.url}-${idx}`}
                article={article}
                aiEnhanced={aiEnhanced}
                userProfile={userProfile}
              />
            ))}
          </div>
        ) : (
          <Card className="news-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No articles found for your selected topics.</p>
              <p className="text-muted-foreground">Try selecting different topics above.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      {articles.length > 0 && (
        <div className="text-center py-8">
          <Button
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Feed
          </Button>
        </div>
      )}
    </div>
  );
};