import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/?error=auth_error');
          return;
        }

        if (data.session) {
          // Successful authentication
          navigate('/?auth=success');
        } else {
          // No session found
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/?error=auth_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-foreground" />
        <p className="text-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;