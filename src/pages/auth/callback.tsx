import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, auth, userProfile } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          console.error("Auth callback error:", sessionError?.message);
          navigate("/?error=auth_failed");
          return;
        }

        // Optional: fetch user and update profile
        const { user, error: userError } = await auth.getUser();
        if (userError || !user) {
          console.error("Failed to fetch user:", userError?.message);
          navigate("/?error=user_fetch_failed");
          return;
        }

        // ✅ Optional: store user profile in DB (only if you want to track users)
        await userProfile.upsertProfile(user.id, user.email);

        // ✅ Redirect to home or dashboard
        navigate("/discover"); // Or replace with your preferred landing route
      } catch (err) {
        console.error("Unexpected error:", err);
        navigate("/?error=unexpected_error");
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
