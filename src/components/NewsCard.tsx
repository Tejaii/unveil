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
      className="card-floating p-8 cursor-pointer group transition-all duration-300 hover:shadow-floating-hover"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className="pill-badge">
              {article.category}
            </Badge>
            {aiEnhanced && (
              <Badge className="bg-bright-periwinkle/20 text-bright-periwinkle rounded-full px-4 py-2 text-sm font-medium">
                AI Enhanced
              </Badge>
            )}
          </div>

          <h2 className="text-2xl font-bold text-deep-blue-violet leading-tight group-hover:text-bright-periwinkle transition-colors">
            {article.title}
          </h2>

          <p className="text-dusty-blue-grey line-clamp-3 leading-relaxed text-lg">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-6 text-dusty-blue-grey">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            
            <ExternalLink className="w-5 h-5 text-dusty-blue-grey group-hover:text-bright-periwinkle transition-colors" />
          </div>
        </div>

        {hasValidImage && (
          <div className="flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-32 h-32 object-cover rounded-2xl shadow-floating"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {aiEnhanced && (
        <div className="mt-6 text-sm text-bright-periwinkle bg-bright-periwinkle/10 p-4 rounded-2xl">
          <span className="font-semibold">AI Insight:</span> This article aligns with your interest in {article.category.toLowerCase()} and matches your {userProfile?.userType || 'user'} profile.
        </div>
      )}
    </div>
  );
};