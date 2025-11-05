"use server";

import { createClient } from "@/lib/supabase/server";
import { POST_STATUS } from "@/model/post_model";

export const onClickNewPost = async () => {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    const { data, error } = await supabase
      .from("admin_post")
      .insert([
        {
          title: null,
          content: null,
          main_category: null,
          sub_category: null,
          thumbnail: null,
          author: res.data.user.id,
          status: null,
        },
      ])
      .select();
    return { status: "success", url: `/create/${data?.[0]?.id}` };
  } else {
    return { status: "failed" };
  }
};

export const handleDraftList = async () => {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    const { data: draft_data, error } = await supabase
      .from("admin_post")
      .select("*")
      .eq("author", res.data.user.id)
      .eq("status", POST_STATUS.TEMP);
    return { status: "success", draft_data };
  } else {
    return { status: "failed" };
  }
};

export const handleRecentPostList = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_post")
    .select("*, user(nickname), comment(count), like(count)")
    .eq("status", POST_STATUS.PUBLISH)
    .order("created_at", { ascending: false });

  if (error) {
    return { status: "failed" };
  }

  return {
    status: "success",
    post_data: data,
  };
};
