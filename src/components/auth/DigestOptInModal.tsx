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
      <DialogContent className="sm:max-w-md glass-modal rounded-2xl border-0">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bright-periwinkle to-deep-blue-violet flex items-center justify-center shadow-floating">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-deep-blue-violet">Stay Informed</DialogTitle>
          </div>
          <p className="text-dusty-blue-grey text-lg">
            Would you like to receive daily AI-curated digests from Unveil?
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Features */}
          <div className="dark:bg-[#1E4036] bg-accent/10 rounded-2xl p-6 space-y-4 border-0">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground">AI-curated content</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground">Daily digest emails</span>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Unsubscribe anytime</span>
            </div>
          </div>

          {/* Campus user badge */}
          {profile?.is_campus_user && (
            <div className="flex justify-center">
              <Badge className="pill-badge border-0">
                🎓 IITH Campus User
              </Badge>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleOptIn(true)}
              disabled={loading}
              className="w-full btn-primary border-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Bell className="w-5 h-5 mr-2" />
              )}
              Yes, send me digests
            </Button>

            <Button
              onClick={() => handleOptIn(false)}
              disabled={loading}
              className="w-full btn-secondary border-0"
            >
              No, not now
            </Button>
          </div>

          <p className="text-xs text-dusty-blue-grey text-center">
            You can change this preference anytime in your settings
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};