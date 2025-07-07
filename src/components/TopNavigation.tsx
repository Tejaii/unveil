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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card shadow-linkedin">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-foreground hover:bg-accent rounded-full p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground hidden sm:block">Unveil</h1>
          </div>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-accent text-foreground rounded-full shadow-linkedin focus:shadow-linkedin-lg placeholder-muted-foreground"
                onClick={toggleSearch}
                readOnly
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex h-5 select-none items-center gap-1 rounded bg-muted/20 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:bg-accent rounded-full p-2"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-accent rounded-full p-2"
          >
            <Bell className="w-4 h-4" />
          </Button>

          <AuthButton />
        </div>
      </div>

      {isMobile && (
        <div className="px-6 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-accent text-foreground rounded-full shadow-linkedin focus:shadow-linkedin-lg placeholder-muted-foreground"
              onClick={toggleSearch}
              readOnly
            />
          </div>
        </div>
      )}
    </nav>
  );
};