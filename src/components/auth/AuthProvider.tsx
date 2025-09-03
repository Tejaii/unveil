import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { auth, userProfile, UserProfile } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithMagicLink: (email: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
  updateDigestPreference: (optIn: boolean) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    const { data, error } = await userProfile.getProfile(user.id);
    if (!error && data) {
      setProfile(data);
    }
  };

  const signInWithMagicLink = async (email: string) => {
    return await auth.signInWithMagicLink(email);
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateDigestPreference = async (optIn: boolean) => {
    if (!user) return;

    const { data, error } = await userProfile.updateDigestPreference(user.id, optIn);
    if (!error && data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    // Get initial session
    auth.getSession().then(({ session }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        // Create or update user profile
        await userProfile.upsertProfile(session.user.id, session.user.email!);
        await refreshProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      refreshProfile();
    }
  }, [user]);

  const value = {
    user,
    session,
    profile,
    loading,
    signInWithMagicLink,
    signOut,
    updateDigestPreference,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};