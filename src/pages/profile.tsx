"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";

type ProfileData = {
  email: string;
  username: string | null;
  avatar_url: string | null;
};

const Profile = () => {
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        return;
      }

      setProfile({
        email: user.email ?? "",
        username: data?.username ?? "Anonymous",
        avatar_url: data?.avatar_url ?? null,
      });
      setLoading(false);
    };

    getProfile();
  }, [supabase]);

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
        <UserIcon className="w-10 h-10 mb-4" />
        <span>No profile data found.</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={profile.avatar_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${profile.username}`}
              alt={profile.username || "Avatar"}
            />
            <AvatarFallback>
              {profile.username?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-muted-foreground text-sm">{profile.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
