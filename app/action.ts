"use server";

import { createClient } from "@/lib/supabase/server";
import { POST_STATUS } from "@/model/post_model";

export const onClickNewPost = async (user_id: string | null | undefined) => {
  if (user_id) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("admin_post")
      .insert([
        {
          title: null,
          content: null,
          main_category: null,
          sub_category: null,
          thumbnail: null,
          author: user_id,
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
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    return { status: "failed" };
  }

  return {
    status: "success",
    post_data: data,
  };
};

export const fetchPopularPost = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_post")
    .select("*, user(nickname), like(count)")
    .eq("status", POST_STATUS.PUBLISH)
    .order("post_likes_count", { ascending: false })
    .limit(4);

  if (error) {
    return { status: "failed" };
  }

  return {
    status: "success",
    post_data: data,
  };
};
