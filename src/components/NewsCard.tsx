import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';

export const NewsCard = ({ article, aiEnhanced, userProfile }) => {
  const handleClick = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Check if we have a valid image URL
  const hasValidImage = article.image && 
    article.image !== '' && 
    !article.image.includes('pexels.com') && 
    !article.image.includes('placeholder');

  return (
    <div 
      className="news-card group border-0"
      onClick={handleClick}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Badge className="pill-badge border-0">
              {article.category}
            </Badge>
            {aiEnhanced && (
              <Badge className="dark:bg-accent/10 dark:text-accent bg-accent/20 text-accent rounded-full px-3 py-1 text-xs font-medium border-0">
                AI Enhanced
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground leading-tight group-hover:text-accent transition-colors">
              {article.title}
            </h2>

            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Image */}
          {hasValidImage && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="font-medium">{article.source}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>

          {aiEnhanced && (
            <div className="mt-4 text-sm text-accent dark:bg-accent/5 bg-accent/10 p-4 rounded-lg border-0">
              <span className="font-semibold">AI Insight:</span> This article aligns with your interest in {article.category.toLowerCase()} and matches your {userProfile?.userType || 'user'} profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};