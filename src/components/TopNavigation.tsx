
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Search, Settings, User, Bell, Sun, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const TopNavigation = ({ onMenuClick, onViewChange, currentView }) => {
  const [searchValue, setSearchValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useIsMobile();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onViewChange('search');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-gray-700 hover:bg-gray-100/80"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Unveil</h1>
          </div>
        </div>

        {!isMobile && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search news, topics, sources..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 bg-white/70 border-gray-200/70 focus:bg-white transition-colors"
              />
            </div>
          </form>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="text-gray-700 hover:bg-gray-100/80"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:bg-gray-100/80"
          >
            <Bell className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-200 text-gray-700">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-lg border-gray-200/70">
              <DropdownMenuItem onClick={() => onViewChange('profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isMobile && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search news..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 bg-white/70 border-gray-200/70"
              />
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};
