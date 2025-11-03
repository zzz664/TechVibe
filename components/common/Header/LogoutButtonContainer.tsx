"use client";

import { Button, Separator } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { useMemo } from "react";

function LogoutButtonContainer({ nickname }: { nickname: unknown | null }) {
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  const handleLogout = () => {
    supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="mr-3 text_xs font-semibold">
        {nickname as string}님 환영합니다.
      </div>
      <Separator orientation="vertical" className="h-4!" />
      <Button
        onClick={() => {
          handleLogout();
        }}
        variant={"ghost"}
        className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500"
      >
        로그아웃
      </Button>
    </div>
  );
}

export { LogoutButtonContainer };
