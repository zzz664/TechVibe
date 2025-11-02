import { createClient } from "@/lib/supabase/server";
import { POST_STATUS, ResponsePostData } from "@/model/post_model";

export async function fetchPublishPostById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_post")
    .select("*")
    .eq("id", id)
    .eq("status", POST_STATUS.PUBLISH);

  const post_data: ResponsePostData = data?.[0] as ResponsePostData;

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
