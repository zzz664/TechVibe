"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const onClickNewPost = async () => {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if(res.data.user) {
    redirect("/create");
  } else {
    return { status: "failed" };
  }
}