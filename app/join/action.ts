"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { formSchema } from "./validation";

export interface JoinResult {
  isSuccess: boolean;
  error?: string;
  userId?: string;
}

export async function onSubmit(
  formData: z.infer<typeof formSchema>
): Promise<JoinResult> {
  const supabase = await createClient();

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return {
      isSuccess: false,
      error: "이미 회원가입이 되어있는 이메일입니다. 회원가입에 실패했습니다.",
    };
  }

  const nickname_res = await supabase
    .from("user")
    .insert([{ id: user?.id, nickname: formData.nickname }])
    .select();

  if (nickname_res.error) {
    const supabase_admin = await createAdminClient();
    await supabase_admin.auth.admin.deleteUser(user?.id as string);
    return {
      isSuccess: false,
      error: "이미 존재하는 닉네임 입니다. 회원가입에 실패했습니다.",
    };
  }

  const userId = user?.id ?? undefined;
  return { isSuccess: true, userId };
}
