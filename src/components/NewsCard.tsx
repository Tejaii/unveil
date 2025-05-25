
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Bookmark, Share2, Clock, TrendingUp, TrendingDown, 
  Minus, ExternalLink, MoreHorizontal, Brain 
} from 'lucide-react';

const getSentimentIcon = (sentiment) => {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="w-3 h-3" />;
    case 'negative':
      return <TrendingDown className="w-3 h-3" />;
    default:
      return <Minus className="w-3 h-3" />;
  }
};

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100/80 text-green-800 border-green-200/50';
    case 'negative':
      return 'bg-red-100/80 text-red-800 border-red-200/50';
    default:
      return 'bg-gray-100/80 text-gray-800 border-gray-200/50';
  }
};

export const NewsCard = ({ article, aiEnhanced, userProfile }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href
      });
    }
  };

  return (
    <Card className="group bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors">
                  {article.title}
                </h2>
                
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span className="font-medium">{article.source}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(article.date)}
                  </div>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-lg border-gray-200/70">
                  <DropdownMenuItem className="cursor-pointer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share article
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tags and Sentiment */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-gray-50/80 text-gray-700 border-gray-200/50">
                {article.category}
              </Badge>
              
              <Badge 
                variant="outline" 
                className={`${getSentimentColor(article.sentiment)} border`}
              >
                {getSentimentIcon(article.sentiment)}
                <span className="ml-1 capitalize">{article.sentiment}</span>
              </Badge>

              {aiEnhanced && (
                <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Enhanced
                </Badge>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <p className="text-gray-700 leading-relaxed">
                {aiEnhanced ? article.summary : article.title}
              </p>
              
              {aiEnhanced && (
                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">AI Insights</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This development could significantly impact the tech industry, with potential applications in automation, research, and problem-solving across multiple sectors.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/70 border-gray-200/70 hover:bg-gray-50/80"
              >
                Read More
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
                className={`${bookmarked ? 'text-gray-900 bg-gray-100/80' : 'text-gray-600'} hover:bg-gray-100/80`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600 hover:bg-gray-100/80"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="lg:w-48 lg:flex-shrink-0">
            <div className="w-full h-32 lg:h-full bg-gradient-to-br from-gray-200/80 to-gray-300/80 rounded-lg border border-gray-200/50 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
