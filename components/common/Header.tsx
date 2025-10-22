import Image from "next/image";
import { Separator, Button } from "../";

function Header() {
  return (
    <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-5">
          <Image src="/logo.png" width={181} height={40} alt="@LOGO" className="cursor-pointer"/>
          <div className="flex items-center gap-3">
            <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">Subject Insight</Button>
            <Separator orientation="vertical" className="h-4! bg-muted-foreground"/>
            <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">Portfolio</Button>
          </div>
        </div>
        <Button variant={"ghost"} className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500">Login</Button>
      </div>
    </header>
  );
}

export { Header };