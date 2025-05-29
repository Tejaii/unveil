import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Compass, TrendingUp, Globe, Clock } from 'lucide-react';

const mockArticles = [
  {
    id: 1,
    title: "The Future of Quantum Computing: Breaking New Boundaries",
    source: "Tech Insights",
    date: "2024-01-15T10:30:00Z",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
  },
  {
    id: 2,
    title: "Sustainable Cities: Innovations in Urban Planning",
    source: "EcoWatch",
    date: "2024-01-15T09:15:00Z",
    category: "Environment",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg"
  },
  {
    id: 3,
    title: "The Rise of Decentralized Finance",
    source: "Finance Weekly",
    date: "2024-01-15T08:45:00Z",
    category: "Finance",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg"
  },
  {
    id: 4,
    title: "Breakthroughs in Renewable Energy Storage",
    source: "Science Today",
    date: "2024-01-15T07:30:00Z",
    category: "Science",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg"
  }
];

const Discover = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Compass className="w-8 h-8 text-gray-700 dark:text-gray-300" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Discover</h1>
          <p className="text-gray-600 dark:text-gray-400">Explore trending topics and popular articles</p>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Trending</h3>
            </div>
            <div className="space-y-2">
              <Badge className="bg-blue-100/80 text-blue-700 dark:bg-blue-900/80 dark:text-blue-300">
                #AI
              </Badge>
              <Badge className="bg-green-100/80 text-green-700 dark:bg-green-900/80 dark:text-green-300">
                #ClimateAction
              </Badge>
              <Badge className="bg-purple-100/80 text-purple-700 dark:bg-purple-900/80 dark:text-purple-300">
                #Innovation
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Global</h3>
            </div>
            <div className="space-y-2">
              <Badge className="bg-red-100/80 text-red-700 dark:bg-red-900/80 dark:text-red-300">
                #Technology
              </Badge>
              <Badge className="bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/80 dark:text-yellow-300">
                #Science
              </Badge>
              <Badge className="bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/80 dark:text-indigo-300">
                #Future
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Latest</h3>
            </div>
            <div className="space-y-2">
              <Badge className="bg-teal-100/80 text-teal-700 dark:bg-teal-900/80 dark:text-teal-300">
                #Research
              </Badge>
              <Badge className="bg-orange-100/80 text-orange-700 dark:bg-orange-900/80 dark:text-orange-300">
                #Development
              </Badge>
              <Badge className="bg-pink-100/80 text-pink-700 dark:bg-pink-900/80 dark:text-pink-300">
                #Growth
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-gray-50/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50">
                  {article.category}
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {article.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{article.source}</span>
                <span>{formatDate(article.date)}</span>
              </div>
              
              <Button className="w-full mt-4 bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600">
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Discover;