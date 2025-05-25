
import React, { useState } from 'react';
import { NewsCard } from './NewsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, ChevronDown, Calendar } from 'lucide-react';

const mockArticles = [
  {
    id: 1,
    title: "Revolutionary AI Model Achieves Human-Level Reasoning in Complex Tasks",
    source: "TechCrunch",
    date: "2024-01-15T10:30:00Z",
    summary: "Researchers at Stanford University have developed a new AI model that demonstrates unprecedented reasoning capabilities, potentially revolutionizing how machines understand and solve complex problems.",
    category: "AI & Machine Learning",
    sentiment: "positive",
    readTime: "4 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
    source: "Reuters",
    date: "2024-01-15T08:15:00Z",
    summary: "World leaders agree on ambitious new targets for carbon reduction, with innovative funding mechanisms for developing nations and breakthrough clean energy initiatives.",
    category: "Climate",
    sentiment: "positive",
    readTime: "6 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 3,
    title: "Market Volatility Continues as Tech Stocks Face Regulatory Pressure",
    source: "Financial Times",
    date: "2024-01-15T07:45:00Z",
    summary: "Major technology companies experience significant stock price fluctuations following new regulatory proposals from the European Union regarding AI governance and data privacy.",
    category: "Finance",
    sentiment: "negative",
    readTime: "3 min read",
    image: "/api/placeholder/400/200"
  }
];

export const NewsFeed = ({ userProfile }) => {
  const [aiEnhanced, setAiEnhanced] = useState(true);
  const [briefingExpanded, setBriefingExpanded] = useState(false);

  const getTodaysBriefing = () => {
    return [
      "AI breakthrough in reasoning capabilities shows 40% improvement over previous models",
      "Global climate agreement secures $100B fund for clean energy transitions",
      "Tech sector volatility continues with 15% average decline in major stocks",
      "New study reveals promising results for renewable energy storage solutions"
    ];
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">For You</h1>
          <p className="text-gray-600">Personalized for {userProfile?.userType || 'you'}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">AI Enhanced</span>
            <Switch 
              checked={aiEnhanced} 
              onCheckedChange={setAiEnhanced}
              className="data-[state=checked]:bg-gray-900"
            />
            <Brain className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Today's Briefing */}
      <Card className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-700" />
              <CardTitle className="text-lg text-gray-900">Today's Briefing</CardTitle>
              <Badge variant="secondary" className="bg-gray-200/80">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBriefingExpanded(!briefingExpanded)}
              className="text-gray-600 hover:bg-gray-100/80"
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
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* News Feed */}
      <div className="space-y-4">
        {mockArticles.map((article) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            aiEnhanced={aiEnhanced}
            userProfile={userProfile}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <Button 
          variant="outline" 
          className="bg-white/70 border-gray-200/70 hover:bg-gray-50/80"
        >
          Load More Articles
        </Button>
      </div>
    </div>
  );
};
