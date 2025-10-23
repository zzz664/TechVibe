"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import Image from "next/image";

{/*login form의 규칙구조*/ }
const formSchema = z.object({
  email: z.email({
    error: "올바른 e-mail 양식을 입력해주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀번호는 최소 8글자입니다."
  }),
});

export default function Home() {
  {/*zod로 설정한 form규칙을 통해 useForm훅으로 form생성*/ }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => { }

  return (
    <main className="w-full h-full min-h-[560px] flex p-6 gap-6 items-start justify-center">
      {/*로그인 폼 영역 */}
      <div className="w-3/4 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">로그인</h4>
          <p className="text-muted-foreground">로그인에 필요한 정보를 입력해주세요.</p>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="이메일" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input placeholder="비밀번호" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-col gap-5">
                  <div className="text-center text-muted-foreground">
                    계정이 없으신가요?
                    <span className="ml-2 underline">회원가입</span>
                  </div>
                  <Button variant={"outline"} type="submit">로그인</Button>
                </div>
              </form>
            </Form>
          </div>
          {/*세로 구분선*/}
          <div className="flex justify-center">
            <div className="relative h-65 border-l border-muted-foreground/50">
              <span className="absolute top-1/2 -translate-y-1/2 -translate-1/2 bg-[#121212] text-muted-foreground text-xs font-semibold">OR</span>
            </div>
          </div>
          <div className="w-100 flex items-center">
            <Button variant={"outline"} className="w-full">
              <Image src="/g-logo.png" alt="@GOOGLE" width={20} height={20}/>
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}