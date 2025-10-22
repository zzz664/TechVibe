import Image from "next/image";
import { Separator } from "../ui/separator";

function Header() {
  return (
    <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-5">
          <Image src="/logo.png" width={181} height={40} alt="@LOGO" className="cursor-pointer"/>
          <div className="flex items-center gap-3">
            <div className="prevent-drag font-semibold h-10 rounded-xl flex items-center justify-center px-3 text-white/90 hover:bg-muted-foreground/20 transition-all duration-500 cursor-pointer">Subject Insight</div>
            <Separator orientation="vertical" className="h-4! bg-muted-foreground"/>
            <div className="prevent-drag font-semibold h-10 rounded-xl flex items-center justify-center px-3 text-white/90 hover:bg-muted-foreground/20 transition-all duration-500 cursor-pointer">Portfolios</div>
          </div>
        </div>
        <div className="prevent-drag font-semibold h-10 rounded-xl flex items-center justify-center px-3 text-white/90 hover:bg-muted-foreground/20 transition-all duration-500 cursor-pointer">Login</div>
      </div>
    </header>
  );
}

export { Header };