
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark, Clock, Folder, Archive, Star } from 'lucide-react';

const savedArticles = [
  {
    id: 1,
    title: "Revolutionary AI Model Achieves Human-Level Reasoning",
    source: "TechCrunch",
    savedAt: "2024-01-15T14:30:00Z",
    category: "AI & Machine Learning",
    folder: "Research",
    readLater: true
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    source: "Reuters",
    savedAt: "2024-01-14T09:15:00Z",
    category: "Climate",
    folder: "Important News",
    readLater: false
  }
];

const folders = [
  { name: "Research", count: 12, color: "bg-blue-100/80" },
  { name: "Important News", count: 8, color: "bg-green-100/80" },
  { name: "Tech Updates", count: 15, color: "bg-purple-100/80" },
  { name: "Reading List", count: 6, color: "bg-orange-100/80" }
];

export const SavedArticles = () => {
  const [activeTab, setActiveTab] = useState('all');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-gray-700" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Articles</h1>
            <p className="text-gray-600">Your bookmarked content and reading lists</p>
          </div>
        </div>
        
        <Button variant="outline" className="bg-white/70 border-gray-200/70">
          <Folder className="w-4 h-4 mr-2" />
          Manage Folders
        </Button>
      </div>

      {/* Folders Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder, index) => (
          <Card key={index} className="bg-white/70 backdrop-blur-sm border-gray-200/50 cursor-pointer hover:bg-white/90 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${folder.color} flex items-center justify-center`}>
                  <Folder className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{folder.name}</h3>
                  <p className="text-sm text-gray-600">{folder.count} articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-gray-200/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-100/80">
            All Saved
          </TabsTrigger>
          <TabsTrigger value="readlater" className="data-[state=active]:bg-gray-100/80">
            <Clock className="w-4 h-4 mr-2" />
            Read Later
          </TabsTrigger>
          <TabsTrigger value="archived" className="data-[state=active]:bg-gray-100/80">
            <Archive className="w-4 h-4 mr-2" />
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {savedArticles.map((article) => (
            <Card key={article.id} className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-gray-50/80 text-gray-700 border-gray-200/50">
                        {article.category}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50">
                        <Folder className="w-3 h-3 mr-1" />
                        {article.folder}
                      </Badge>
                      {article.readLater && (
                        <Badge variant="outline" className="bg-orange-50/80 text-orange-700 border-orange-200/50">
                          <Clock className="w-3 h-3 mr-1" />
                          Read Later
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">{article.source}</span>
                      <span>Saved {formatDate(article.savedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100/80">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100/80">
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="readlater" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles in Read Later</h3>
              <p className="text-gray-600">Save articles to read later when you have more time</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-12 text-center">
              <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No archived articles</h3>
              <p className="text-gray-600">Archived articles will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
