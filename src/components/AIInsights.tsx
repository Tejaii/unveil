
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, TrendingUp, Clock, Tag, BarChart3, 
  Lightbulb, Globe, Calendar, Zap 
} from 'lucide-react';

const trendingTopics = [
  { topic: 'Artificial Intelligence', mentions: 1247, growth: '+24%', sentiment: 'positive' },
  { topic: 'Climate Action', mentions: 892, growth: '+18%', sentiment: 'positive' },
  { topic: 'Market Volatility', mentions: 634, growth: '+12%', sentiment: 'negative' },
  { topic: 'Tech Regulation', mentions: 567, growth: '+8%', sentiment: 'neutral' },
];

const sentimentData = [
  { sentiment: 'Positive', count: 456, percentage: 52, color: 'bg-green-500' },
  { sentiment: 'Neutral', count: 289, percentage: 33, color: 'bg-gray-500' },
  { sentiment: 'Negative', count: 131, percentage: 15, color: 'bg-red-500' },
];

const keyInsights = [
  {
    title: "AI Innovation Surge",
    description: "Major breakthroughs in AI reasoning capabilities are reshaping multiple industries",
    impact: "High",
    timeframe: "Next 6 months"
  },
  {
    title: "Climate Policy Momentum",
    description: "Global climate agreements gaining unprecedented support from world leaders",
    impact: "Medium",
    timeframe: "Next 12 months"
  },
  {
    title: "Tech Sector Uncertainty",
    description: "Regulatory pressures creating volatility in technology stock valuations",
    impact: "Medium",
    timeframe: "Next 3 months"
  }
];

export const AIInsights = ({ userProfile }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-gray-700" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600">Data-driven analysis of news trends and patterns</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100/80 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Articles Today</p>
                <p className="text-xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100/80 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Trending Topics</p>
                <p className="text-xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100/80 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sources</p>
                <p className="text-xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100/80 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Breaking News</p>
                <p className="text-xl font-bold text-gray-900">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        topic.sentiment === 'positive' ? 'bg-green-50/80 text-green-700 border-green-200/50' :
                        topic.sentiment === 'negative' ? 'bg-red-50/80 text-red-700 border-red-200/50' :
                        'bg-gray-50/80 text-gray-700 border-gray-200/50'
                      }`}
                    >
                      {topic.sentiment}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{topic.mentions} mentions</span>
                    <span className="text-green-600 font-medium">{topic.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sentimentData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{data.sentiment}</span>
                  <span className="text-sm text-gray-600">{data.count} articles</span>
                </div>
                <Progress value={data.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-gray-700" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${
                        insight.impact === 'High' ? 'bg-red-50/80 text-red-700 border-red-200/50' :
                        'bg-yellow-50/80 text-yellow-700 border-yellow-200/50'
                      }`}
                    >
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{insight.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{insight.timeframe}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Summary */}
      <Card className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-gray-700" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700">
              <strong>Current Focus:</strong> The news landscape is heavily focused on technological advancement, 
              particularly AI breakthroughs, alongside significant climate policy developments.
            </p>
            <p className="text-gray-700">
              <strong>Market Sentiment:</strong> Overall positive sentiment (52%) driven by innovation stories, 
              with regulatory concerns creating moderate uncertainty in tech sectors.
            </p>
            <p className="text-gray-700">
              <strong>Emerging Themes:</strong> Cross-sector AI adoption, international climate cooperation, 
              and evolving regulatory frameworks are shaping medium-term narratives.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
