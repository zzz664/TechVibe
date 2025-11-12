"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { onSubmit } from "@/app/join/action";
import { formSchema } from "@/app/join/validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function JoinForm() {
  const router = useRouter();

  {
    /*zod로 설정한 form규칙을 통해 useForm훅으로 form생성*/
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const res = await onSubmit(values);
          if (res?.isSuccess) {
            toast.success("회원가입을 완료하였습니다.");
            router.push("/login");
          } else {
            toast.error(res?.error);
          }
        })}
        className="space-y-3"
      >
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
            <Link href={"/login"} className="ml-2 underline hover:text-white">
              로그인
            </Link>
          </div>
          <div className="flex gap-3">
            <Button
              variant={"outline"}
              onClick={() => {
                router.back();
              }}
              type="button"
              size={"icon"}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant={"outline"}
              type="submit"
              className="flex-1 bg-teal-700/85! hover:bg-teal-700!"
            >
              회원가입
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { JoinForm };
