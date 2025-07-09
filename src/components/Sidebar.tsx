import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Home, TrendingUp, Brain, Settings,
  X, Clock, User, Calendar, Compass, Zap
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navigationItems = [
  { id: 'feed', label: 'For You', icon: Home, desc: 'Personalized feed' },
  { id: 'discover', label: 'Discover', icon: Compass, desc: 'Explore new content' },
  { id: 'insights', label: 'AI Insights', icon: Brain, desc: 'AI analysis' },
];

const filterCategories = [
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'technology', label: 'Technology', icon: Zap },
  { id: 'ai', label: 'AI', icon: Brain },
  { id: 'health', label: 'Health', icon: User },
];

export const Sidebar = ({ isOpen, onClose, currentView, onViewChange, userProfile, isWideScreen }) => {
  const isMobile = useIsMobile();

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
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
            onClick={onClose}
          />
        )}
        
        {/* Mobile Bottom Navigation */}
        <div 
          className={`fixed bottom-0 left-0 right-0 z-50 glass-nav transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-around py-4">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-2 p-4 h-auto rounded-xl ${
                  currentView === item.id ? 'text-accent bg-secondary' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
              >
                <item.icon className="w-5 h-5" />
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
          bg-background z-50 overflow-hidden lg:translate-x-0
          transition-transform duration-300 ease-in-out
          ${!isWideScreen && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Close button - Only shown on mobile */}
          {isMobile && (
            <div className="flex justify-between items-center p-6 lg:hidden">
              <h2 className="font-semibold text-foreground">Navigation</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-xl">
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-8">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 px-3 uppercase tracking-wide">
                  Main
                </h3>
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start text-left h-auto p-4 rounded-xl transition-all ${
                        currentView === item.id
                          ? 'text-accent bg-secondary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                      onClick={() => {
                        onViewChange(item.id);
                        if (!isWideScreen) onClose();
                      }}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-medium text-base">{item.label}</div>
                        <div className="text-sm opacity-75">{item.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filter Categories */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 px-3 uppercase tracking-wide">
                  Categories
                </h3>
                <div className="space-y-2">
                  {filterCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary h-auto p-4 rounded-xl"
                      onClick={() => {
                        onViewChange(category.id);
                        if (!isWideScreen) onClose();
                      }}
                    >
                      <category.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{category.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Progress Card */}
              <Card className="news-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold text-foreground">Today's Progress</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Articles read</span>
                      <Badge className="pill-badge">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Reading streak</span>
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
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl p-4"
              onClick={() => {
                onViewChange('settings');
                if (!isWideScreen) onClose();
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span className="font-medium">Settings</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};