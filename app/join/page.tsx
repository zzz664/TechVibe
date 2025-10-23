"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

{/*join form의 규칙구조*/ }
const formSchema = z.object({
  email: z.email({
    error: "올바른 e-mail 양식을 입력해주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀번호는 최소 8글자입니다."
  }),
  confirmPassword: z.string().min(8, {
    error: "비밀번호는 최소 8글자입니다."
  }),
  nickname: z.string().regex(/[가-힣a-zA-Z0-9]$/, {
    error: "닉네임에 특수문자나 단자음, 단모음을 사용할 수 없습니다."
  }).min(2, {
    error: "닉네임은 최소 2글자 이상입니다."
  }).max(6, {
    error: "닉네임은 최대 6글자 입니다."
  }),
}).refine(data => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  error: "비밀번호가 일치하지 않습니다.",
});

export default function Home() {
  {/*zod로 설정한 form규칙을 통해 useForm훅으로 form생성*/ }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
  });

  const onSubmit = () => { }

  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6 items-start justify-center">
      {/*회원가입 폼 영역*/}
      <div className="w-100 flex flex-col gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">회원가입</h4>
          <p className="text-muted-foreground">회원가입에 필요한 정보를 입력해주세요.</p>
        </div>
        <div className="">
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
                      <Input type="password" placeholder="비밀번호" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호 확인" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="닉네임" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col gap-5">
                <div className="text-center text-muted-foreground">
                  이미 계정이 있으신가요?
                  <Link href={"/login"} className="ml-2 underline hover:text-white">로그인</Link>
                </div>
                <div className="flex gap-3">
                  <Button variant={"outline"} type="button" size={"icon"}>
                    <ArrowLeft/>
                  </Button>
                  <Button variant={"outline"} type="submit" className="flex-1 bg-teal-700/85! hover:bg-teal-700!">회원가입</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}