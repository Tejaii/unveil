import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Sparkles, Bell, X } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface DigestOptInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigestOptInModal: React.FC<DigestOptInModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { updateDigestPreference, profile } = useAuth();

  const handleOptIn = async (optIn: boolean) => {
    setLoading(true);
    await updateDigestPreference(optIn);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">Stay Informed</DialogTitle>
          </div>
          <p className="text-muted-foreground">
            Would you like to receive daily AI-curated digests from Unveil?
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Features */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-foreground">AI-curated content</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-foreground">Daily digest emails</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-foreground">Unsubscribe anytime</span>
            </div>
          </div>

          {/* Campus user badge */}
          {profile?.is_campus_user && (
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50">
                🎓 IITH Campus User
              </Badge>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => handleOptIn(true)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Bell className="w-4 h-4 mr-2" />
              )}
              Yes, send me digests
            </Button>

            <Button
              onClick={() => handleOptIn(false)}
              disabled={loading}
              variant="outline"
              className="w-full border-border text-muted-foreground hover:bg-secondary/50"
            >
              No, not now
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You can change this preference anytime in your settings
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};