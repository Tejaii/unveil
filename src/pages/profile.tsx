"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
 return (
 <div className="flex flex-col items-center justify-center h-screen">
 <Skeleton className="h-32 w-32 rounded-full mb-4" />
 <Skeleton className="h-6 w-48 mb-2" />
 <Skeleton className="h-4 w-32" />
 </div>
    );
  }

  if (!user) {
    // This case should ideally not be reached due to the useEffect redirect,
    // but as a fallback:
    return (
      <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
        <UserIcon className="w-10 h-10 mb-4" />
        <span>No profile data found.</span>
 <button onClick={() => navigate("/signin")} className="mt-4 text-primary underline">
 Sign In
 </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 flex flex-col items-center gap-4">
 <Avatar className="w-24 h-24">
            <AvatarImage
 src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.id}`}
 alt={user.user_metadata?.full_name || "Avatar"}
            />
            <AvatarFallback>
 {user.user_metadata?.full_name?.charAt(0).toUpperCase() ?? user.email?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
 <h2 className="text-2xl font-semibold">{user.user_metadata?.full_name || "User"}</h2>
 <p className="text-muted-foreground text-base">{user.email}</p>
            {profile?.digest_opt_in && <p className="text-green-600 text-sm mt-1">Subscribed to digest</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
