"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const onClickNewPost = async () => {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    const { data, error } = await supabase
      .from('admin_post')
      .insert([
        { title: null, content: null, main_category: null, sub_category: null, thumbnail: null, author: res.data.user.id, status: "temp"},
      ])
      .select();
    redirect(`/create/${data?.[0]?.id}`);
  } else {
    return { status: "failed" };
  }
}

export const handleDraftList = async () => {
  return { status: "failed" };
}