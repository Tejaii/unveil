import { createClient } from "@supabase/supabase-js";

// 🌍 Env vars (Vercel or local .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const siteLink = import.meta.env.VITE_SITE_URL;

if (!supabaseUrl || !supabaseAnonKey || !siteLink) {
  throw new Error("Missing Supabase environment variables");
}

// ✅ Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===================
// 📌 Types
// ===================
export interface UserProfile {
  id: string;
  email: string;
  digest_opt_in: boolean;
  is_campus_user: boolean;
  joined_at: string;
  updated_at: string;
}

// ===================
// 🔐 Auth Functions
// ===================
export const auth = {
  // 🚀 Sign in with magic link
  signInWithMagicLink: async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://vercel.com/tejaiis-projects/unveil-ong2/auth/callback",
      },
    });

    if (error) {
      console.error("Magic link error:", error.message);
      return { success: false, error };
    }

    return { success: true, data };
  },

  // 🔒 Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { success: !error, error };
  },

  // 📥 Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // 🙋‍♂️ Get logged in user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // 🔁 Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// =============================
// 👤 User Profile Management
// =============================
export const userProfile = {
  // ✍️ Create or update profile
  upsertProfile: async (
    userId: string,
    email: string,
    digestOptIn?: boolean
  ) => {
    const now = new Date().toISOString();

    const profileData: Partial<UserProfile> = {
      id: userId,
      email,
      updated_at: now,
    };

    if (digestOptIn !== undefined) {
      profileData.digest_opt_in = digestOptIn;
    }

    // Check if user already exists to set joined_at
    const { data: existing, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (!existing && !fetchError) {
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

  // 📄 Get profile by ID
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return { data, error };
  },

  // 📨 Update digest preference
  updateDigestPreference: async (userId: string, digestOptIn: boolean) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        digest_opt_in: digestOptIn,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    return { data, error };
  },

  // 📬 Get all users who opted in for digests
  getDigestOptInUsers: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, is_campus_user")
      .eq("digest_opt_in", true);

    return { data, error };
  },
};
