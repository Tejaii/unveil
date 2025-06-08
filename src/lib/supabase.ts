import { createClient } from "@supabase/supabase-js";

// Environment variables from .env or Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const siteLink = import.meta.env.VITE_SITE_URL;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =======================
// 📌 Types
// =======================
export interface UserProfile {
  id: string;
  email: string;
  digest_opt_in: boolean;
  is_campus_user: boolean;
  joined_at: string;
  updated_at: string;
}

// =======================
// 🔐 Auth Utilities
// =======================
export const auth = {
  // ✅ Send magic link to email
  signInWithMagicLink: async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteLink}/auth/callback`,
      },
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      return { success: false, error };
    }

    return { success: true, data };
  },

  // ✅ Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { success: !error, error };
  },

  // ✅ Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // ✅ Get current user (recommended for ID/email fetch)
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // ✅ Listen to login/logout changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// ==========================
// 🧠 User Profile Utilities
// ==========================
export const userProfile = {
  // ✅ Create or update user profile
  upsertProfile: async (
    userId: string,
    email: string,
    digestOptIn?: boolean
  ) => {
    const now = new Date().toISOString();

    // Check if user exists already
    const { data: existing, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    const profileData: any = {
      id: userId,
      email,
      updated_at: now,
    };

    if (digestOptIn !== undefined) {
      profileData.digest_opt_in = digestOptIn;
    }

    if (!existing) {
      profileData.joined_at = now;
    }

    const { data, error } = await supabase
      .from("users")
      .upsert(profileData, {
        onConflict: "id",
        ignoreDuplicates: false,
      })
      .select()
      .single();

    return { data, error };
  },

  // ✅ Get user profile by ID
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return { data, error };
  },

  // ✅ Update digest opt-in preference
  updateDigestPreference: async (userId: string, digestOptIn: boolean) => {
    const { data, error } = await supabase
      .from("users")
      .update({ digest_opt_in: digestOptIn, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    return { data, error };
  },

  // ✅ Fetch all digest-subscribed users (for newsletters)
  getDigestOptInUsers: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, is_campus_user")
      .eq("digest_opt_in", true);

    return { data, error };
  },
};
