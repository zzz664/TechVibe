import Image from "next/image";
import { Separator, Button } from "../ui";
import Link from "next/link";

function Header() {
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
        <Link href={"/login"}>
          <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">로그인</Button>
        </Link>
      </div>
    </header>
  );
}

export { Header };