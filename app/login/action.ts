"use server"

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { formSchema } from "./validation";

export async function onSubmit(formData: z.infer<typeof formSchema>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if(error) {
    return { isSuccess: false, error: "로그인에 실패했습니다." }
  }

  if(data) {
    console.log(data);
  }

  return { isSuccess: true, data };
}