import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Mail } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { AuthModal } from './AuthModal';
import { DigestOptInModal } from './DigestOptInModal';

export const AuthButton: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDigestModal, setShowDigestModal] = useState(false);

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowAuthModal(true)}
          variant="outline"
          className="bg-background text-foreground hover:bg-secondary/50 border-0"
        >
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0 border-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-foreground text-sm">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        <DropdownMenuContent align="end" className="w-56 bg-card border-0">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-foreground">{user.email}</p>
            {profile?.is_campus_user && (
              <p className="text-xs text-muted-foreground">🎓 IITH Campus User</p>
            )}
          </div>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem 
            onClick={() => setShowDigestModal(true)}
            className="text-foreground hover:bg-secondary/50 cursor-pointer border-0"
          >
            <Mail className="mr-2 h-4 w-4" />
            Digest Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-foreground hover:bg-secondary/50 cursor-pointer">
          <DropdownMenuItem className="text-foreground hover:bg-secondary/50 cursor-pointer border-0">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem 
            onClick={signOut}
            className="text-foreground hover:bg-secondary/50 cursor-pointer border-0"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DigestOptInModal 
        isOpen={showDigestModal} 
        onClose={() => setShowDigestModal(false)} 
      />
    </>
  );
};