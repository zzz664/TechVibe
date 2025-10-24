"use server"

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { formSchema } from "./validation";

export async function onSubmit(formData: z.infer<typeof formSchema>) {
  const supabase = await createClient(); 

  console.log(formData);
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if(error) {
    return;
  }

  if(data) {

  }
}