"use server"

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { formSchema } from "./validation";

export interface JoinResult {
  isSuccess: boolean;
  error?: string;
  userId?: string;
}

export async function onSubmit(formData: z.infer<typeof formSchema>): Promise<JoinResult> {
  const supabase = await createClient(); 

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if(error) {
    return { isSuccess: false, error: "이미 회원가입이 되어있는 이메일입니다."}
  }

  const userId = data?.user?.id ?? undefined;
  return { isSuccess: true, userId };
}