import Image from "next/image";
import Link from "next/link";
import { Separator, Button } from "../../ui";
import { checkSession } from "./action";
import { LogoutButtonContainer } from "./LogoutButtonContainer";
import { LoginButtonContainer } from "./LoginButtonContainer";
import { HamburgerMenu } from "./HamburgerMenu";

async function Header() {
  const res = await checkSession();

  return (
    <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex items-center justify-between sm:px-6 px-4 py-3">
        <HamburgerMenu />
        <div className="hidden sm:flex items-center gap-5 mr-auto">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              priority
              width={181}
              height={40}
              alt="@LOGO"
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant={"ghost"}
              className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500"
              asChild
            >
              <Link href={"/post"}>전체 게시글</Link>
            </Button>
            <Separator
              orientation="vertical"
              className="h-4! bg-muted-foreground"
            />
            <Button
              variant={"ghost"}
              className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500"
            >
              포트폴리오
            </Button>
          </div>
        </div>
        <Link href={"/"} className="sm:hidden">
          <h2 className="scroll-m-20 pb-2 text-xl sm:text-2xl font-semibold tracking-tight first:mt-0">
            Tech Vibe
          </h2>
        </Link>
        {res.user ? (
          <LogoutButtonContainer nickname={res.nickname} />
        ) : (
          <LoginButtonContainer />
        )}
      </div>
    </header>
  );
}

export { Header };
