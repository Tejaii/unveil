import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Search, Settings, User, Bell, Sun, Moon, Keyboard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import { AuthButton } from './auth/AuthButton';

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-floating">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-bright-periwinkle hover:bg-active-pill rounded-2xl p-3"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-bright-periwinkle to-deep-blue-violet flex items-center justify-center shadow-floating">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <h1 className="text-2xl font-bold text-deep-blue-violet hidden sm:block">Unveil</h1>
          </div>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dusty-blue-grey" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-16 py-3 bg-light-slate/50 text-deep-blue-violet rounded-2xl shadow-floating focus:shadow-floating-lg placeholder-dusty-blue-grey backdrop-blur-sm"
                onClick={toggleSearch}
                readOnly
              />
              <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 inline-flex h-6 select-none items-center gap-1 rounded-lg bg-active-pill px-2 font-mono text-xs font-medium text-deep-blue-violet">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-bright-periwinkle hover:bg-active-pill rounded-2xl p-3"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-bright-periwinkle hover:bg-active-pill rounded-2xl p-3"
          >
            <Bell className="w-5 h-5" />
          </Button>

          <AuthButton />
        </div>
      </div>

      {isMobile && (
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dusty-blue-grey" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 bg-light-slate/50 text-deep-blue-violet rounded-2xl shadow-floating focus:shadow-floating-lg placeholder-dusty-blue-grey backdrop-blur-sm"
              onClick={toggleSearch}
              readOnly
            />
          </div>
        </div>
      )}
    </nav>
  );
};