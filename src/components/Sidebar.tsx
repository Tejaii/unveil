import React, { useEffect } from 'react';
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

const getProfileZones = (userType: string) => {
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

export const Sidebar = ({ isOpen, onClose, currentView, onViewChange, userProfile, isWideScreen }) => {
  const isMobile = useIsMobile();
  const profileZones = getProfileZones(userProfile?.userType);

  // Auto-close sidebar on resize to desktop (unless wide screen)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !isWideScreen) onClose();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose, isWideScreen]);

  // Mobile bottom nav
  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay - Only shown when sidebar is open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
            onClick={onClose}
          />
        )}
        
        {/* Mobile Bottom Navigation */}
        <div 
          className={`fixed bottom-0 left-0 right-0 z-50 bg-light-slate/80 backdrop-blur-md shadow-floating-lg transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-around py-4">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-2 p-4 h-auto rounded-2xl ${
                  currentView === item.id ? 'menu-active' : 'text-dusty-blue-grey hover:bg-active-pill'
                }`}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`
          fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 
          bg-lilac-mist/50 backdrop-blur-md shadow-floating
          z-50 overflow-hidden lg:translate-x-0
          transition-transform duration-300 ease-in-out
          ${!isWideScreen && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Close button - Only shown on mobile */}
          {isMobile && (
            <div className="flex justify-between items-center p-6 lg:hidden">
              <h2 className="font-semibold text-deep-blue-violet">Navigation</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-2xl">
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-8">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-medium text-dusty-blue-grey mb-6 px-4 uppercase tracking-wide">
                  Main
                </h3>
                <div className="space-y-3">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start text-left h-auto p-5 rounded-2xl transition-all ${
                        currentView === item.id
                          ? 'menu-active shadow-floating'
                          : 'text-dusty-blue-grey hover:bg-active-pill hover:text-deep-blue-violet'
                      }`}
                      onClick={() => {
                        onViewChange(item.id);
                        if (!isWideScreen) onClose();
                      }}
                    >
                      <item.icon className="w-6 h-6 mr-4" />
                      <div>
                        <div className="font-semibold text-base">{item.label}</div>
                        <div className="text-sm opacity-75">{item.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Profile Zones */}
              {profileZones.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-dusty-blue-grey mb-6 px-4 uppercase tracking-wide">
                    Your Zones
                  </h3>
                  <div className="space-y-3">
                    {profileZones.map((zone) => (
                      <Button
                        key={zone.id}
                        variant="ghost"
                        className="w-full justify-start text-dusty-blue-grey hover:bg-active-pill hover:text-deep-blue-violet h-auto p-5 rounded-2xl"
                        onClick={() => {
                          onViewChange(zone.id);
                          if (!isWideScreen) onClose();
                        }}
                      >
                        <zone.icon className="w-6 h-6 mr-4" />
                        <span className="font-semibold">{zone.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Card */}
              <Card className="card-floating">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-bright-periwinkle" />
                    <h4 className="font-semibold text-deep-blue-violet text-lg">Today's Progress</h4>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-dusty-blue-grey">Articles read</span>
                      <Badge className="pill-badge">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-dusty-blue-grey">Reading streak</span>
                      <Badge className="pill-badge">7 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Settings Button */}
          <div className="p-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-dusty-blue-grey hover:bg-active-pill hover:text-deep-blue-violet rounded-2xl p-5"
              onClick={() => {
                onViewChange('settings');
                if (!isWideScreen) onClose();
              }}
            >
              <Settings className="w-6 h-6 mr-4" />
              <span className="font-semibold">Settings</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};