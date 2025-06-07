import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Sparkles, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithMagicLink } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    const { error } = await signInWithMagicLink(email);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSent(false);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gray-200" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">Welcome to Unveil</DialogTitle>
          </div>
          <p className="text-muted-foreground">
            Sign in with your email to get personalized AI-curated news
          </p>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send magic link
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We'll send you a secure link to sign in without a password
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Check your email</h3>
              <p className="text-muted-foreground">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Click the link in your email to sign in to Unveil
              </p>
            </div>
            <Button variant="outline" onClick={handleClose} className="w-full">
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};