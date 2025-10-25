"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores";
import { Button, Separator } from "../../ui";
import { onLogout } from "./action";

type Props = {
  initialHasAuth?: boolean;
  initialNickname?: string;
  onLogout?: () => void;
}

function UserInfo({ initialHasAuth = false, initialNickname} : Props) {
  const router = useRouter();
  const resetUser = useAuthStore(state => state.resetUser);

  const [ hasAuth, setHasAuth] = useState<boolean>(initialHasAuth);
  const [ nickname ] = useState<string>(initialNickname as string);

  const handleLogout = async () => {
    await onLogout();
    resetUser();
    setHasAuth(false);
    router.refresh();
  }

  return (
    <>
      {hasAuth ?
        <div className="flex items-center gap-3">
          <div className="mr-3 text_xs font-semibold">
            {nickname}님 환영합니다.
          </div>
          <Separator orientation="vertical" className="h-4!"/>
          <Button variant={"ghost"} onClick={handleLogout} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">
            로그아웃
          </Button>
        </div> :
        <Link href={"/login"}>
          <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">
            로그인
          </Button>
        </Link>
      }
    </>
  );
}

export { UserInfo };