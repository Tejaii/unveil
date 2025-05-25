
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, TrendingUp, Clock } from 'lucide-react';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    timeframe: 'all',
    source: 'all',
    sentiment: 'all'
  });

  const recentSearches = [
    'AI breakthrough', 'Climate summit', 'Tech stocks', 'Renewable energy'
  ];

  const trendingQueries = [
    'Artificial Intelligence', 'Climate Change', 'Market Analysis', 'Space Exploration'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Search</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="search"
            placeholder="Search news, topics, sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg bg-white/70 border-gray-200/70 focus:bg-white transition-colors"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="bg-white/70 border-gray-200/70">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-white/70 border-gray-200/70">
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="bg-white/70 border-gray-200/70">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
        </div>
      </div>

      {/* Recent Searches */}
      {!searchQuery && (
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Recent Searches</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer bg-gray-50/80 text-gray-700 border-gray-200/50 hover:bg-gray-100/80"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Queries */}
      {!searchQuery && (
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Trending Now</h3>
            </div>
            
            <div className="space-y-3">
              {trendingQueries.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 cursor-pointer hover:bg-gray-100/60 transition-colors"
                  onClick={() => setSearchQuery(query)}
                >
                  <span className="font-medium text-gray-900">{query}</span>
                  <Badge variant="secondary" className="bg-gray-200/80">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchQuery && (
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Searching for "{searchQuery}"
              </h3>
              <p className="text-gray-600">
                AI-powered search results will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
