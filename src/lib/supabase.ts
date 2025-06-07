import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const siteLink = import.meta.env.VITE_SITE_URL;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
  id: string;
  email: string;
  digest_opt_in: boolean;
  is_campus_user: boolean;
  joined_at: string;
  updated_at: string;
}

// Auth utilities
export const auth = {
  // Send magic link to email
  signInWithMagicLink: async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: import.meta.env.VITE_SITE_URL + "/auth/callback"

      },
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// User profile utilities
export const userProfile = {
  // Create or update user profile
  upsertProfile: async (userId: string, email: string, digestOptIn?: boolean) => {
    const profileData: any = {
      id: userId,
      email,
    };

    if (digestOptIn !== undefined) {
      profileData.digest_opt_in = digestOptIn;
    }

    const { data, error } = await supabase
      .from('users')
      .upsert(profileData, {
        onConflict: 'id',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    return { data, error };
  },

  // Get user profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  },

  // Update digest preference
  updateDigestPreference: async (userId: string, digestOptIn: boolean) => {
    const { data, error } = await supabase
      .from('users')
      .update({ digest_opt_in: digestOptIn })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  // Get all users who opted in for digests (service role only)
  getDigestOptInUsers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, is_campus_user')
      .eq('digest_opt_in', true);

    return { data, error };
  },
};
