"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { useMemo } from "react";
import { User } from "lucide-react";

function LogoutButtonContainer({ nickname }: { nickname: unknown | null }) {
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  const handleLogout = () => {
    supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <div className="md:flex md:items-center md:gap-3 hidden">
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
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger>
            <User className="p-2 w-10 h-10 hover:bg-accent/85 cursor-pointer rounded-sm" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <div className="text_xs font-semibold">
                {nickname as string}님 환영합니다.
                <p>즐겁고 보람찬 하루 보내세요!</p>
              </div>
              <Separator />
              <Button
                onClick={() => {
                  handleLogout();
                }}
                variant={"outline"}
                className="prevent-drag border-0 font-semibold text-muted-foreground hover:text-white transition-all duration-500"
              >
                로그아웃
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export { LogoutButtonContainer };
