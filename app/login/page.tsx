"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { formSchema } from "./validation";
import { onSubmit } from "./action";
import { toast } from "sonner";
import { useAuthStore } from "@/stores";

export default function Home() {
  const setUser = useAuthStore(state => state.setUser);

  {/*zod로 설정한 form규칙을 통해 useForm훅으로 form생성*/ }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
              <form onSubmit={form.handleSubmit(async (values) => {
                const res = await onSubmit(values);
                if (res?.isSuccess) {
                  toast.success("로그인에 성공했습니다.");
                  setUser({ id: res.user?.id as string, nickname: res.nickname});
                  window.location.href = "/";
                } else {
                  toast.error(res?.error);
                }
              })} className="space-y-3">
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
                        <Input type="password" placeholder="비밀번호" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-col gap-5">
                  <div className="text-center text-muted-foreground">
                    계정이 없으신가요?
                    <Link href={"/join"} className="ml-2 underline hover:text-white">회원가입</Link>
                  </div>
                  <Button variant={"outline"} type="submit" className="bg-teal-700/85! hover:bg-teal-700!">로그인</Button>
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
              <Image src="/g-logo.png" alt="@GOOGLE" width={20} height={20} />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}