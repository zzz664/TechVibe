"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { formSchema } from "./validation";

export async function onSubmit(formData: z.infer<typeof formSchema>) {
  const supabase = await createClient();

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.log(error);
    return { isSuccess: false, error: "로그인에 실패했습니다." };
  }

  const nickname_res = await supabase
    .from("user")
    .select("nickname")
    .eq("id", user?.id)
    .single();

  return {
    isSuccess: true,
    user: user,
    session: session,
    nickname: nickname_res.data?.nickname,
  };
}
