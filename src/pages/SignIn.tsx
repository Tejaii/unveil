import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';

const SignIn: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-auto bg-card rounded-2xl card-shadow border-0">
        <CardContent className="p-12 text-center space-y-8">
          {/* Logo and Title */}
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto shadow-floating">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-5xl font-bold text-foreground">
              Unveil
            </h1>
          </div>

          {/* Sign In Button */}
          <Button
            onClick={() => setShowAuthModal(true)}
            className="w-full btn-primary text-lg py-4 border-0"
          >
            Sign In
          </Button>
        </CardContent>
      </Card>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default SignIn;