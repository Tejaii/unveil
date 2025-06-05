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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] border-b border-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-gray-300 hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-gray-200 font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-bold text-gray-100 hidden sm:block">Unveil</h1>
          </div>
        </div>

        {!isMobile && (
          <Button
            variant="outline"
            className="flex-1 max-w-md mx-4 justify-between bg-[#2e2e2e] border-gray-700 text-gray-300"
            onClick={toggleSearch}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Search...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-700 bg-[#1e1e1e] px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-300 hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:bg-gray-800"
          >
            <Bell className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-700 text-gray-300">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#1e1e1e] border-gray-700">
              <DropdownMenuItem onClick={() => onViewChange('profile')} className="cursor-pointer text-gray-300 hover:bg-gray-800">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('settings')} className="cursor-pointer text-gray-300 hover:bg-gray-800">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-300 hover:bg-gray-800">
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
            className="w-full justify-between bg-[#2e2e2e] border-gray-700 text-gray-300"
            onClick={toggleSearch}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Search...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-700 bg-[#1e1e1e] px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      )}
    </nav>
  );
};