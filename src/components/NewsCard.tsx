import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, User } from 'lucide-react';

export const NewsCard = ({ article, aiEnhanced, userProfile }) => {
  const handleClick = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Check if we have a valid image URL that's not a placeholder
  const hasValidImage = article.image && 
    article.image !== '' && 
    !article.image.includes('pexels.com') && // Remove placeholder images
    !article.image.includes('placeholder');

  return (
    <div 
      className="bg-tile-background p-6 rounded-xl border border-container-border shadow-sm space-y-4 hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className="bg-button-bg text-button-text border-container-border text-xs transition-colors"
            >
              {article.category}
            </Badge>
            {aiEnhanced && (
              <Badge 
                variant="outline" 
                className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50 text-xs transition-colors"
              >
                AI Enhanced
              </Badge>
            )}
          </div>

          <h2 className="text-xl font-semibold text-tile-text leading-tight group-hover:text-foreground transition-colors">
            {article.title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.source}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>

        {hasValidImage && (
          <div className="flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-24 h-24 object-cover rounded-lg border border-container-border transition-all duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {aiEnhanced && (
        <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded border border-blue-200 dark:border-blue-800/30 transition-colors">
          <span className="font-medium">AI Insight:</span> This article aligns with your interest in {article.category.toLowerCase()} and matches your {userProfile?.userType || 'user'} profile.
        </div>
      )}
    </div>
  );
};