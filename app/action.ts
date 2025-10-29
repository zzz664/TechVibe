"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { POST_STATUS } from "@/model/post_model";

export const onClickNewPost = async () => {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    const { data, error } = await supabase
      .from('admin_post')
      .insert([
        { title: null, content: null, main_category: null, sub_category: null, thumbnail: null, author: res.data.user.id, status: null },
      ])
      .select();
    redirect(`/create/${data?.[0]?.id}`);
  } else {
    return { status: "failed" };
  }
}

export const handleDraftList = async () => {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    const { data: draft_data, error } = await supabase
    .from('admin_post')
    .select('*')
    .eq('author', res.data.user.id)
    .eq('status', POST_STATUS.TEMP);
    return { status: "success", draft_data };
  } else {
    return { status: "failed" };
  }
}