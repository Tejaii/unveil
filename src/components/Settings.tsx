
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, User, Bell, Brain, 
  Palette, Globe, Shield, Zap 
} from 'lucide-react';

const contentZones = [
  { id: 'ai-pulse', name: 'AI Pulse', desc: 'Latest AI developments', enabled: true },
  { id: 'global-watch', name: 'Global Watch', desc: 'International news', enabled: true },
  { id: 'campus-central', name: 'Campus Central', desc: 'Academic & student news', enabled: false },
  { id: 'tech-stack', name: 'Tech Stack', desc: 'Developer & programming news', enabled: true },
  { id: 'finance-flow', name: 'Finance Flow', desc: 'Market & financial updates', enabled: false }
];

export const Settings = ({ userProfile }) => {
  const [notifications, setNotifications] = useState({
    dailyDigest: true,
    breakingNews: false,
    weeklyReport: true,
    aiInsights: true
  });

  const [preferences, setPreferences] = useState({
    aiEnhanced: true,
    darkMode: false,
    timeFormat: '12h',
    readingDepth: userProfile?.readingDepth || 'summaries'
  });

  const [zones, setZones] = useState(contentZones);

  const toggleZone = (zoneId) => {
    setZones(prev => prev.map(zone => 
      zone.id === zoneId ? { ...zone, enabled: !zone.enabled } : zone
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-gray-700" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Customize your Unveil experience</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/70 border border-gray-200/50">
          <TabsTrigger value="general" className="data-[state=active]:bg-gray-100/80">
            <User className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-100/80">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="personalization" className="data-[state=active]:bg-gray-100/80">
            <Brain className="w-4 h-4 mr-2" />
            AI & Content
          </TabsTrigger>
          <TabsTrigger value="zones" className="data-[state=active]:bg-gray-100/80">
            <Globe className="w-4 h-4 mr-2" />
            Zones
          </TabsTrigger>
          <TabsTrigger value="labs" className="data-[state=active]:bg-gray-100/80">
            <Zap className="w-4 h-4 mr-2" />
            Labs
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <Switch 
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Time Format</h4>
                  <p className="text-sm text-gray-600">Choose 12 or 24 hour format</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={preferences.timeFormat === '12h' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, timeFormat: '12h' }))}
                    className={preferences.timeFormat === '12h' ? 'bg-gray-900 text-white' : 'bg-white/70 border-gray-200/70'}
                  >
                    12h
                  </Button>
                  <Button
                    variant={preferences.timeFormat === '24h' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, timeFormat: '24h' }))}
                    className={preferences.timeFormat === '24h' ? 'bg-gray-900 text-white' : 'bg-white/70 border-gray-200/70'}
                  >
                    24h
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">User Type</h4>
                <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50">
                  {userProfile?.userType || 'General Consumer'}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile?.interests?.slice(0, 5).map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50/80 text-gray-700 border-gray-200/50">
                      {interest}
                    </Badge>
                  ))}
                  {userProfile?.interests?.length > 5 && (
                    <Badge variant="outline" className="bg-gray-50/80 text-gray-700 border-gray-200/50">
                      +{userProfile.interests.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button variant="outline" className="bg-white/70 border-gray-200/70">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Daily Digest</h4>
                  <p className="text-sm text-gray-600">Morning summary of top stories</p>
                </div>
                <Switch 
                  checked={notifications.dailyDigest}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, dailyDigest: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Breaking News</h4>
                  <p className="text-sm text-gray-600">Immediate alerts for major events</p>
                </div>
                <Switch 
                  checked={notifications.breakingNews}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, breakingNews: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Weekly Report</h4>
                  <p className="text-sm text-gray-600">Reading stats and highlights</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReport: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">AI Insights</h4>
                  <p className="text-sm text-gray-600">Personalized analysis notifications</p>
                </div>
                <Switch 
                  checked={notifications.aiInsights}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, aiInsights: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personalization */}
        <TabsContent value="personalization" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>AI Enhancement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">AI-Enhanced Articles</h4>
                  <p className="text-sm text-gray-600">Show AI summaries and insights</p>
                </div>
                <Switch 
                  checked={preferences.aiEnhanced}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, aiEnhanced: checked }))}
                />
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Reading Depth</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['headlines', 'summaries', 'full'].map((depth) => (
                    <Button
                      key={depth}
                      variant={preferences.readingDepth === depth ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences(prev => ({ ...prev, readingDepth: depth }))}
                      className={preferences.readingDepth === depth ? 'bg-gray-900 text-white' : 'bg-white/70 border-gray-200/70'}
                    >
                      {depth.charAt(0).toUpperCase() + depth.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zone Manager */}
        <TabsContent value="zones" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Content Zones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {zones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{zone.name}</h4>
                    <p className="text-sm text-gray-600">{zone.desc}</p>
                  </div>
                  <Switch 
                    checked={zone.enabled}
                    onCheckedChange={() => toggleZone(zone.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Labs */}
        <TabsContent value="labs" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gray-700" />
                Experimental Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50/50 rounded-lg border border-yellow-200/50">
                <h4 className="font-medium text-yellow-800 mb-2">Beta Features</h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Try out experimental features before they're officially released
                </p>
                <Button variant="outline" size="sm" className="bg-yellow-100/80 border-yellow-200/50 text-yellow-800">
                  Enable Beta Access
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Advanced AI Filtering</h4>
                    <p className="text-sm text-gray-600">Enhanced content curation</p>
                  </div>
                  <Badge variant="outline" className="bg-orange-50/80 text-orange-700 border-orange-200/50">
                    Coming Soon
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Voice Summaries</h4>
                    <p className="text-sm text-gray-600">Listen to article summaries</p>
                  </div>
                  <Badge variant="outline" className="bg-purple-50/80 text-purple-700 border-purple-200/50">
                    Beta
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
