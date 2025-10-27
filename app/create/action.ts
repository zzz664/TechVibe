"use server";

import { createClient } from "@/lib/supabase/server";
import { PostData } from "@/model";

export async function onClickSaveDraft(post_data: PostData) {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    if (!post_data.title && !post_data.content && !post_data.sub_category && !post_data.thumbnail) {
      return { status: "save_draft_failed" };
    } else {
      const { data, error } = await supabase
        .from('admin_post')
        .update([
          {
            title: post_data.title,
            content: post_data.content,
            main_category: post_data.main_category,
            sub_category: post_data.sub_category,
            thumbnail: post_data.thumbnail,
            author: res.data.user.id,
            status: "temp"
          },
        ])
        .eq("id", +post_data.id)
        .select();
      return { status: "save_draft_success" }
    }
  } else {
    return { status: "failed" };
  }
}