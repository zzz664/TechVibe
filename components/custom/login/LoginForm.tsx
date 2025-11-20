"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { formSchema } from "@/app/login/validation";
import { useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function LoginForm() {
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const { error } = await supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password,
            });
            if (error) {
              toast.error(error.message);
            } else {
              toast.success("로그인에 성공했습니다.");
              window.location.replace("/");
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
          <div className="w-full flex flex-col gap-5">
            <div className="text-center text-muted-foreground">
              계정이 없으신가요?
              <Link href={"/join"} className="ml-2 underline hover:text-white">
                회원가입
              </Link>
            </div>
            <Button
              variant={"outline"}
              type="submit"
              className="bg-teal-700/85! hover:bg-teal-700!"
            >
              로그인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export { LoginForm };
