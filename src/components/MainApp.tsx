import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { NewsFeed } from './NewsFeed';
import { AIInsights } from './AIInsights';
import { Discover } from './Discover';
import { UserProfile } from './UserProfile';
import { Settings } from './Settings';
import { useIsMobile } from '@/hooks/use-mobile';

export const MainApp = ({ userProfile }) => {
  const [currentView, setCurrentView] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (currentView) {
      case 'feed':
        return <NewsFeed userProfile={userProfile} />;
      case 'insights':
        return <AIInsights userProfile={userProfile} />;
      case 'discover':
        return <Discover />;
      case 'profile':
        return <UserProfile userProfile={userProfile} />;
      case 'settings':
        return <Settings userProfile={userProfile} />;
      default:
        return <NewsFeed userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-gray-900 dark:to-gray-800/90">
      <TopNavigation 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
          userProfile={userProfile}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          !isMobile && sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="pt-16 pb-20 md:pb-4">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};