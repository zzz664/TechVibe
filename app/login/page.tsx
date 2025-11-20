import Image from "next/image";
import { Button } from "@/components/ui";
import { LoginForm } from "@/components/custom";

export default function Home() {
  return (
    <main className="w-full h-full min-h-[560px] flex gap-6 items-start justify-center">
      {/*로그인 폼 영역 */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col sm:ml-45 p-6 sm:px-0!">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            로그인
          </h4>
          <p className="text-muted-foreground">
            로그인에 필요한 정보를 입력해주세요.
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center gap-6 sm:gap-15 px-6 sm:px-45">
          <LoginForm />
          {/*세로 구분선*/}
          <div className="hidden sm:flex justify-center">
            <div className="relative h-65 border-l border-muted-foreground/50">
              <span className="absolute top-1/2 -translate-y-1/2 -translate-1/2 bg-[#121212] text-muted-foreground text-xs font-semibold">
                OR
              </span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <Button variant={"outline"} className="w-full">
              <Image src="/g-logo.png" alt="@GOOGLE" width={20} height={20} />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
