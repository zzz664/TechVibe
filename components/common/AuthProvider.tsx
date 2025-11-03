"use client";

import { useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUserId, setNickname } = useAuthStore();
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  useEffect(() => {
    const setInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data } = await supabase
          .from("user")
          .select("nickname")
          .eq("id", session?.user.id)
          .single();
        setNickname(data?.nickname);
        setUserId(session.user.id);
      } else {
        setNickname(null);
        setUserId(null);
      }
    };

    setInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          supabase
            .from("user")
            .select("nickname")
            .eq("id", session?.user.id)
            .single()
            .then(({ data }) => {
              setNickname(data?.nickname);
            });

          setUserId(session?.user.id);
          break;
        case "TOKEN_REFRESHED":
          break;
        case "USER_UPDATED":
          supabase
            .from("user")
            .select("nickname")
            .eq("id", session?.user.id)
            .single()
            .then(({ data }) => {
              setNickname(data?.nickname);
            });

          setUserId(session?.user.id);
          break;
        case "SIGNED_OUT":
          setNickname(null);
          setUserId(null);
          break;
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUserId, setNickname]);

  return children;
}

export { AuthProvider };
