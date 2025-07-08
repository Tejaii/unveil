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
      <DialogContent className="sm:max-w-md glass-modal shadow-floating-lg rounded-2xl border-0">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bright-periwinkle to-deep-blue-violet flex items-center justify-center shadow-floating">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-deep-blue-violet">Welcome to Unveil</DialogTitle>
          </div>
          <p className="text-dusty-blue-grey text-lg">
            Sign in with your email to get personalized AI-curated news
          </p>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-deep-blue-violet font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-light-slate/50 border-0 text-deep-blue-violet rounded-2xl p-4 placeholder-dusty-blue-grey focus:shadow-floating-lg"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="rounded-2xl border-0">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full btn-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Send magic link
                </>
              )}
            </Button>

            <p className="text-xs text-dusty-blue-grey text-center">
              We'll send you a secure link to sign in without a password
            </p>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-bright-periwinkle" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-deep-blue-violet mb-3">Check your email</h3>
              <p className="text-dusty-blue-grey text-lg">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-dusty-blue-grey mt-3">
                Click the link in your email to sign in to Unveil
              </p>
            </div>
            <Button variant="outline" onClick={handleClose} className="w-full btn-secondary">
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};