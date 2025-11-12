import Image from "next/image";
import { Button } from "@/components/ui";
import { LoginForm } from "@/components/custom";

export default function Home() {
  return (
    <main className="w-full h-full min-h-[560px] flex p-6 gap-6 items-start justify-center">
      {/*로그인 폼 영역 */}
      <div className="w-3/4 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            로그인
          </h4>
          <p className="text-muted-foreground">
            로그인에 필요한 정보를 입력해주세요.
          </p>
        </div>
        <div className="w-full flex justify-between">
          <LoginForm />
          {/*세로 구분선*/}
          <div className="flex justify-center">
            <div className="relative h-65 border-l border-muted-foreground/50">
              <span className="absolute top-1/2 -translate-y-1/2 -translate-1/2 bg-[#121212] text-muted-foreground text-xs font-semibold">
                OR
              </span>
            </div>
          </div>
          <div className="w-100 flex items-center">
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
