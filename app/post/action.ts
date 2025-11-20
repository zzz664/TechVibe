"use server";

import { createClient } from "@/lib/supabase/server";
import { POST_STATUS, ResponsePostDataDetail } from "@/model/post_model";
import { revalidatePath } from "next/cache";

export async function fetchPublishPostByCat(category: string) {
  const supabase = await createClient();

  if (category) {
    const { data, error } = await supabase
      .from("admin_post")
      .select("*, user(nickname), comment(count)")
      .eq("sub_category", category)
      .eq("status", POST_STATUS.PUBLISH);

    if (error) {
      return { status: "failed" };
    }

    return { status: "success", fetch_data: data };
  }
  const { data, error } = await supabase
    .from("admin_post")
    .select("*, user(nickname), comment(count)")
    .eq("status", POST_STATUS.PUBLISH);

  if (error) {
    return { status: "failed" };
  }
  return { status: "success", fetch_data: data };
}

export async function fetchPublishPostById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_post")
    .select("*, comment(id,created_at,content,nickname,user_id), like(*)")
    .eq("id", id)
    .eq("status", POST_STATUS.PUBLISH)
    .single();

  const post_data: ResponsePostDataDetail = data as ResponsePostDataDetail;

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

export async function deletePost(
  id: string,
  status: string,
  thumbnailURL: string
) {
  const supabase = await createClient();

  const { error: delete_error } = await supabase
    .from("admin_post")
    .delete()
    .eq("id", id);

  if (delete_error) {
    return { status: "delete failed" };
  }

  if (thumbnailURL !== "") {
    const splitURL = thumbnailURL.split(".");
    const fileName = splitURL[splitURL.length - 2].split("/").pop();
    if (!fileName?.includes("_default")) {
      const { data: storage_data, error: storage_error } =
        await supabase.storage
          .from("tech-vibe files")
          .remove([`posts/${fileName}.webp`]);
      if (storage_error) {
        return { status: "delete failed" };
      }
    }
  }

  if (status === "temp") revalidatePath("/");

  return { status: "delete success" };
}

export async function deleteComment(post_id: string, id: string) {
  const supabase = await createClient();

  const { error: delete_error } = await supabase
    .from("comment")
    .delete()
    .eq("id", id);

  if (delete_error) {
    return { status: "delete failed" };
  }

  revalidatePath(`/post/${post_id}`);

  return { status: "delete success" };
}

export async function updateLikeStatus(
  post_id: string,
  id: string,
  current: boolean
) {
  const supabase = await createClient();
  const { data: auth_data, error: auth_error } = await supabase.auth.getUser();

  if (auth_error) {
    return { status: "auth failed" };
  }

  if (current) {
    const { error: like_error } = await supabase
      .from("like")
      .delete()
      .eq("id", id);
    if (like_error) return { status: "failed" };
  } else {
    const { error: like_error } = await supabase
      .from("like")
      .insert([
        { post_id: post_id, user_id: auth_data.user.id, status: !current },
      ]);
    if (like_error) return { status: "failed" };
  }

  revalidatePath(`/post/${post_id}`);

  return { status: "success" };
}
