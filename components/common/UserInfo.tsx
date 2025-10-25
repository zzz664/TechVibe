"use client";

import { useAuthStore } from "@/stores";
import { Button, Separator } from "../ui";
import Link from "next/link";

function UserInfo() {
  const nickname = useAuthStore((state) => state.nickname);

  return (
    <>
      {nickname ?
        <div className="flex items-center gap-3">
          <div className="mr-3 text_xs font-semibold">
            {nickname}님 환영합니다.
          </div>
          <Separator orientation="vertical" className="h-4!"/>
          <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">
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