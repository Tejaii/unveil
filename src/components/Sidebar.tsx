import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, TrendingUp, Brain, Settings, 
  X, Clock, User, Calendar, Compass
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navigationItems = [
  { id: 'feed', label: 'For You', icon: Home, desc: 'Personalized feed' },
  { id: 'discover', label: 'Discover', icon: Compass, desc: 'Explore new content' },
  { id: 'insights', label: 'AI Insights', icon: Brain, desc: 'AI analysis' },
];

const getProfileZones = (userType) => {
  const zones = {
    student: [
      { id: 'campus', label: 'Campus Central', icon: Calendar },
      { id: 'research', label: 'Research Hub', icon: Brain },
    ],
    developer: [
      { id: 'techstack', label: 'Tech Stack', icon: Brain },
      { id: 'opensource', label: 'Open Source', icon: Calendar },
    ],
    consumer: [
      { id: 'lifestyle', label: 'Lifestyle', icon: User },
      { id: 'finance', label: 'Finance Flow', icon: TrendingUp },
    ],
    enthusiast: [
      { id: 'global', label: 'Global Watch', icon: TrendingUp },
      { id: 'analysis', label: 'Deep Analysis', icon: Brain },
    ]
  };
  return zones[userType] || [];
};

export const Sidebar = ({ isOpen, onClose, currentView, onViewChange, userProfile }) => {
  const isMobile = useIsMobile();
  const profileZones = getProfileZones(userProfile?.userType);

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40\" onClick={onClose} />
        )}
        
        <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="flex justify-around py-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 p-2 h-auto ${
                  currentView === item.id ? 'text-gray-900 bg-gray-100/80' : 'text-gray-600'
                }`}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden\" onClick={onClose} />
      )}
      
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200/50 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="font-semibold text-gray-900">Navigation</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Main</h3>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start text-left h-auto p-3 ${
                      currentView === item.id 
                        ? 'bg-gray-100/80 text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50/80'
                    }`}
                    onClick={() => {
                      onViewChange(item.id);
                      if (isMobile) onClose();
                    }}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {profileZones.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                  Your Zones
                </h3>
                <div className="space-y-1">
                  {profileZones.map((zone) => (
                    <Button
                      key={zone.id}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:bg-gray-50/80 h-auto p-3"
                      onClick={() => {
                        onViewChange(zone.id);
                        if (isMobile) onClose();
                      }}
                    >
                      <zone.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{zone.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Card className="bg-gradient-to-br from-gray-50/80 to-gray-100/80 border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">Today's Progress</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Articles read</span>
                      <Badge variant="secondary" className="bg-gray-200/80">12</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reading streak</span>
                      <Badge variant="secondary" className="bg-gray-200/80">7 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4 border-t border-gray-200/50">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-50/80"
                onClick={() => {
                  onViewChange('settings');
                  if (isMobile) onClose();
                }}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};