
import React from 'react';

export const NewsCard = ({ article, aiEnhanced, userProfile }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 shadow-sm space-y-2">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      <h2 className="text-xl font-semibold text-gray-100">{article.title}</h2>

      <p className="text-sm text-gray-400">{article.summary}</p>

      <div className="flex items-center justify-between pt-2 text-sm text-gray-500">
        <span>{article.source}</span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
      </div>

      {aiEnhanced && (
        <div className="text-xs text-blue-400 mt-2">
          AI Mode: Showing enhanced content for {userProfile?.userType || 'guest'}
        </div>
      )}
    </div>
  );
};
