import { JoinForm } from "@/components/custom";

export default function Home() {
  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6 items-start justify-center">
      {/*회원가입 폼 영역*/}
      <div className="w-100 flex flex-col gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            회원가입
          </h4>
          <p className="text-muted-foreground">
            회원가입에 필요한 정보를 입력해주세요.
          </p>
        </div>
        <JoinForm />
      </div>
    </main>
  );
}
