"use server";

import { createClient } from "@/lib/supabase/server";
import { POST_STATUS, ResponsePostDataWithComment } from "@/model/post_model";
import { revalidatePath } from "next/cache";

export async function fetchPublishPostById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_post")
    .select("*, comment(id,created_at,content,nickname)")
    .eq("id", id)
    .eq("status", POST_STATUS.PUBLISH)
    .single();

  const post_data: ResponsePostDataWithComment =
    data as ResponsePostDataWithComment;

  if (error) {
    return { fetch_data: null, status: "failed" };
  }

  return { fetch_data: post_data, status: "success" };
}

export async function fetchUserId() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { userId: null, status: "failed" };
  }

  return { userId: data.user.id, status: "success" };
}

export async function saveComment(
  post_id: string,
  content: string,
  nickname: string | null
) {
  if (!content) {
    return { status: "blank content" };
  }

  const supabase = await createClient();

  const { data: auth_data, error: auth_error } = await supabase.auth.getUser();

  if (auth_error) {
    return { status: "auth failed" };
  }

  const { error: save_error } = await supabase.from("comment").insert([
    {
      post_id: post_id,
      content: content,
      user_id: auth_data.user.id,
      nickname: nickname,
    },
  ]);

  if (save_error) {
    return { status: "save failed" };
  }

  revalidatePath(`/post/${post_id}`);
  return { status: "success" };
}
