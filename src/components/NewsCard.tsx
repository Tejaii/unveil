import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, User } from 'lucide-react';

export const NewsCard = ({ article, aiEnhanced, userProfile }) => {
  const handleClick = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 shadow-sm space-y-4 hover:bg-[#252525] transition-colors cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className="bg-gray-800 text-gray-300 border-gray-600 text-xs"
            >
              {article.category}
            </Badge>
            {aiEnhanced && (
              <Badge 
                variant="outline" 
                className="bg-blue-900/30 text-blue-400 border-blue-700/50 text-xs"
              >
                AI Enhanced
              </Badge>
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-100 leading-tight group-hover:text-white transition-colors">
            {article.title}
          </h2>

          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-gray-500">
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
            
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
          </div>
        </div>

        {article.image && (
          <div className="flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-24 h-24 object-cover rounded-lg border border-gray-700"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {aiEnhanced && (
        <div className="text-xs text-blue-400 bg-blue-900/20 p-2 rounded border border-blue-800/30">
          <span className="font-medium">AI Insight:</span> This article aligns with your interest in {article.category.toLowerCase()} and matches your {userProfile?.userType || 'user'} profile.
        </div>
      )}
    </div>
  );
};