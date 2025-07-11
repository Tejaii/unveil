import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Settings, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AuthButton } from './auth/AuthButton';
import { useIsMobile } from '@/hooks/use-mobile';

export const TopNavigation = ({ onMenuClick, onViewChange, currentView }) => {
  const [searchValue, setSearchValue] = useState('');
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onViewChange('search');
    }
  };

  const toggleSearch = () => {
    document.dispatchEvent(new CustomEvent("toggle-search"));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button for Mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-muted-foreground hover:text-foreground rounded-lg p-2 lg:hidden border-0"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-bold text-foreground hidden sm:block">Unveil</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-16 py-3 bg-accent text-white rounded-xl placeholder-white/70 focus:ring-2 focus:ring-accent border-0 outline-0"
              onClick={toggleSearch}
              readOnly
            />
            {!isMobile && (
              <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground rounded-lg p-2 border-0"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground rounded-lg p-2 hidden sm:flex border-0"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <AuthButton />
        </div>
      </div>
    </nav>
  );
};