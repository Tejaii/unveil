import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink
} from 'lucide-react';

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="w-3 h-3" />;
    case 'negative':
      return <TrendingDown className="w-3 h-3" />;
    default:
      return <Minus className="w-3 h-3" />;
  }
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100/80 text-green-800 border-green-200/50';
    case 'negative':
      return 'bg-red-100/80 text-red-800 border-red-200/50';
    default:
      return 'bg-gray-100/80 text-gray-800 border-gray-200/50';
  }
};

interface Article {
  title?: string;
  source?: string;
  date?: string;
  readTime?: string;
  category?: string;
  sentiment?: string;
  summary?: string;
  image?: string;
  url?: string;
}

interface NewsCardProps {
  article: Article;
  aiEnhanced?: boolean;
  userProfile?: unknown;
}

export const NewsCard = ({ article, aiEnhanced = false, userProfile }: NewsCardProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
                  {article?.title || 'Untitled'}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">{article?.source || 'Unknown Source'}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(article?.date)}
                  </div>
                  {article?.readTime && (
                    <>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-gray-50/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border-gray-200/50"
              >
                {article?.category || 'General'}
              </Badge>

              <Badge
                variant="outline"
                className={`${getSentimentColor(article?.sentiment || 'neutral')} dark:bg-gray-700/80 dark:text-gray-300 border`}
              >
                {getSentimentIcon(article?.sentiment || 'neutral')}
                <span className="ml-1 capitalize">{article?.sentiment || 'neutral'}</span>
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {article?.summary || article?.title || 'No summary available.'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${liked ? 'text-green-600 bg-green-50/80 dark:bg-green-900/20' : 'text-gray-600 dark:text-gray-400'} hover:bg-gray-100/80 dark:hover:bg-gray-700/80`}
              >
                <ThumbsUp className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDislike}
                className={`${disliked ? 'text-red-600 bg-red-50/80 dark:bg-red-900/20' : 'text-gray-600 dark:text-gray-400'} hover:bg-gray-100/80 dark:hover:bg-gray-700/80`}
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/80"
              >
                <Share2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/80"
                onClick={() => window.open(article?.url || '#', '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {article?.image && (
            <div className="lg:w-48 lg:flex-shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-32 lg:h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

