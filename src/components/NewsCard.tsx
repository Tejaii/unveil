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
      className="bg-card p-6 rounded-lg shadow-soft space-y-4 hover:shadow-soft-lg cursor-pointer group border-0"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className="bg-secondary text-secondary-foreground border-border text-xs"
            >
              {article.category}
            </Badge>
            {aiEnhanced && (
              <Badge 
                variant="outline" 
                className="bg-primary/10 text-primary border-primary/20 text-xs"
              >
                AI Enhanced
              </Badge>
            )}
          </div>

          <h2 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary">
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
            
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </div>
        </div>

        {hasValidImage && (
          <div className="flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {aiEnhanced && (
        <div className="text-xs text-primary bg-primary/5 p-2 rounded border border-primary/10">
          <span className="font-medium">AI Insight:</span> This article aligns with your interest in {article.category.toLowerCase()} and matches your {userProfile?.userType || 'user'} profile.
        </div>
      )}
    </div>
  );
};