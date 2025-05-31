import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Search, Settings, User, Bell, Sun, Moon, Keyboard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:block">Unveil</h1>
          </div>
        </div>

        {!isMobile && (
          <Button
            variant="outline"
            className="flex-1 max-w-md mx-4 justify-between"
            onClick={toggleSearch}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Search...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            <Bell className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-gray-200/70 dark:border-gray-700/70">
              <DropdownMenuItem onClick={() => onViewChange('profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Keyboard className="mr-2 h-4 w-4" />
                Keyboard Shortcuts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isMobile && (
        <div className="px-4 pb-3">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={toggleSearch}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Search...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      )}
    </nav>
  );
};