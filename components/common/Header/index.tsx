import Image from "next/image";
import Link from "next/link";
import { Separator, Button } from "../../ui";
import { UserInfo } from "./UserInfo";
import { createClient } from "@/lib/supabase/server";
import { onLogout } from "./action";

async function Header() {
  const supabase = await createClient();
  const user_res = await supabase.auth.getUser();
  const nickname_res = Boolean(user_res.data.user) ? await supabase.from("user").select("nickname").eq("id", user_res.data.user?.id).single() : null;
  
  return (
    <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <Image src="/logo.png" width={181} height={40} alt="@LOGO" className="cursor-pointer" />
          </Link>
          <div className="flex items-center gap-3">
            <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">전체 게시글</Button>
            <Separator orientation="vertical" className="h-4! bg-muted-foreground" />
            <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">포트폴리오</Button>
          </div>
        </div>
        <UserInfo initialHasAuth={Boolean(user_res.data.user)} initialNickname={nickname_res ? nickname_res.data?.nickname : ""} onLogout={onLogout}/>
      </div>
    </header>
  );
}

export { Header };