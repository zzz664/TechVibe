"use server";

import { createClient } from "@/lib/supabase/server";
import { POST_STATUS, ResponsePostData } from "@/model/post_model";

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

  const { data: post_data, error: post_error } = await supabase
    .from("admin_post")
    .select("*")
    .eq("status", POST_STATUS.PUBLISH);

  const { data: user_list, error: user_list_error } = await supabase
    .from("user")
    .select("*");
  if (post_error || user_list_error) {
    return { status: "failed" };
  } else {
    const sorted_post_data = post_data?.sort(
      (a: ResponsePostData, b: ResponsePostData) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return {
      status: "success",
      post_data: sorted_post_data,
      user_list: user_list,
    };
  }
};
