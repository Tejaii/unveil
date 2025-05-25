
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, BookOpen, Calendar, TrendingUp, 
  Award, Clock, Target, Zap 
} from 'lucide-react';

const readingStats = {
  articlesRead: 156,
  readingStreak: 12,
  avgReadingTime: 8,
  topCategory: 'AI & Technology',
  weeklyGoal: 20,
  weeklyProgress: 14
};

const achievements = [
  { name: 'Speed Reader', desc: 'Read 100+ articles', icon: Zap, earned: true },
  { name: 'Consistent Reader', desc: '7-day reading streak', icon: Calendar, earned: true },
  { name: 'Explorer', desc: 'Read from 10+ sources', icon: Target, earned: false },
  { name: 'AI Enthusiast', desc: 'Read 50+ AI articles', icon: Award, earned: true }
];

export const UserProfile = ({ userProfile }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gray-200 text-gray-700 text-2xl">U</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50">
                  {userProfile?.userType || 'User'}
                </Badge>
                <Badge variant="outline" className="bg-green-50/80 text-green-700 border-green-200/50">
                  {readingStats.readingStreak} day streak
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Articles Read</span>
                  <p className="font-semibold text-gray-900">{readingStats.articlesRead}</p>
                </div>
                <div>
                  <span className="text-gray-600">Avg. Time</span>
                  <p className="font-semibold text-gray-900">{readingStats.avgReadingTime} min</p>
                </div>
                <div>
                  <span className="text-gray-600">Top Category</span>
                  <p className="font-semibold text-gray-900">{readingStats.topCategory}</p>
                </div>
                <div>
                  <span className="text-gray-600">Member Since</span>
                  <p className="font-semibold text-gray-900">Jan 2024</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reading Goals */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-gray-700" />
              Weekly Reading Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Progress this week</span>
              <span className="font-semibold text-gray-900">
                {readingStats.weeklyProgress}/{readingStats.weeklyGoal} articles
              </span>
            </div>
            
            <Progress 
              value={(readingStats.weeklyProgress / readingStats.weeklyGoal) * 100} 
              className="h-3"
            />
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {readingStats.weeklyGoal - readingStats.weeklyProgress} articles to reach your goal
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Reading Activity */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-700" />
              Reading Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Today</p>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <p className="text-2xl font-bold text-gray-900">84</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <p className="text-2xl font-bold text-gray-900">312</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-700" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    achievement.earned
                      ? 'bg-gray-50/50 border-gray-200/50'
                      : 'bg-gray-20/30 border-gray-100/30 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                    achievement.earned ? 'bg-gray-200/80' : 'bg-gray-100/50'
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${
                      achievement.earned ? 'text-gray-700' : 'text-gray-400'
                    }`} />
                  </div>
                  <h4 className={`font-medium mb-1 ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-xs ${
                    achievement.earned ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              Your Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile?.interests?.map((interest, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gray-50/80 text-gray-700 border-gray-200/50"
                >
                  {interest}
                </Badge>
              )) || (
                <p className="text-gray-600">No interests selected</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
