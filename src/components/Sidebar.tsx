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
          className={`fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-border/50 transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-around py-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 p-2 h-auto ${
                  currentView === item.id ? 'text-foreground bg-accent/80' : 'text-muted-foreground'
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
      {/* Desktop Sidebar */}
      <aside 
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 
          bg-card/80 backdrop-blur-lg border-r border-border/50 
          z-50 overflow-hidden lg:translate-x-0
          transition-transform duration-300 ease-in-out
          ${!isWideScreen && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Close button - Only shown on mobile */}
          {isMobile && (
            <div className="flex justify-between items-center p-4 lg:hidden">
              <h2 className="font-semibold text-foreground">Navigation</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="space-y-6">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Main
                </h3>
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start text-left h-auto p-3 ${
                        currentView === item.id
                          ? 'bg-accent text-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-accent/80'
                      }`}
                      onClick={() => {
                        onViewChange(item.id);
                        if (!isWideScreen) onClose();
                      }}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Profile Zones */}
              {profileZones.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                    Your Zones
                  </h3>
                  <div className="space-y-1">
                    {profileZones.map((zone) => (
                      <Button
                        key={zone.id}
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:bg-accent/80 h-auto p-3"
                        onClick={() => {
                          onViewChange(zone.id);
                          if (!isWideScreen) onClose();
                        }}
                      >
                        <zone.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{zone.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Card */}
              <Card className="bg-accent/50 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <h4 className="font-medium text-foreground">Today's Progress</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Articles read</span>
                      <Badge variant="secondary" className="bg-accent text-foreground">12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading streak</span>
                      <Badge variant="secondary" className="bg-accent text-foreground">7 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Settings Button */}
          <div className="p-4 border-t border-border/50">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-accent/80"
              onClick={() => {
                onViewChange('settings');
                if (!isWideScreen) onClose();
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};