import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  skills: string[];
  created_at: string;
  updated_at: string;
  github_access_token?: string | null;
  github_username?: string | null;
  github_languages?: Array<{ name: string; bytes: number; percentage: number }> | null;
}

export const useProfile = (userId?: string) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: ["profile", targetUserId],
    queryFn: async () => {
      if (!targetUserId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", targetUserId)
        .maybeSingle();

      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!targetUserId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updates: Partial<Pick<Profile, "display_name" | "avatar_url" | "bio" | "skills">>) => {
      if (!user?.id) throw new Error("Not authenticated");

      // Use upsert to create profile if it doesn't exist
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          { 
            user_id: user.id,
            ...updates 
          },
          { onConflict: "user_id" }
        )
        .select()
        .single();

      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
};
