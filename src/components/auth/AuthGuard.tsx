import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { DigestOptInModal } from './DigestOptInModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, profile, loading } = useAuth();
  const [showDigestModal, setShowDigestModal] = useState(false);

  useEffect(() => {
    // Show digest opt-in modal for new users who haven't made a choice yet
    if (user && profile && profile.digest_opt_in === false) {
      // Check if this is a new user (joined recently)
      const joinedAt = new Date(profile.joined_at);
      const now = new Date();
      const timeDiff = now.getTime() - joinedAt.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);

      // Show modal if user joined within the last hour (new user)
      if (hoursDiff < 1) {
        setShowDigestModal(true);
      }
    }
  }, [user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <DigestOptInModal 
        isOpen={showDigestModal} 
        onClose={() => setShowDigestModal(false)} 
      />
    </>
  );
};