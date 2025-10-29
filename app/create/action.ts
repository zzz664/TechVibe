"use server";

import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";
import { PostData } from "@/model";
import { POST_STATUS, ResponsePostData } from "@/model/post_model";

export async function fetchPostById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('admin_post').select('*').eq('id', id);
  
  const post_data:ResponsePostData = data?.[0] as ResponsePostData;

  if (error) {
    return { fetch_data: null, status: "failed" };
  }

  return { fetch_data: post_data, status: "success" };
}

export async function onClickSaveDraft(post_data: PostData) {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    if (!post_data.title && !post_data.content && !post_data.sub_category && !post_data.thumbnail) {
      return { status: "save_draft_failed" };
    } else {
      //supabase storage에 파일을 업로드 후 public url을 얻는 과정
      let thumbnailURL: string | null = null;

      if (post_data.thumbnail && post_data.thumbnail instanceof File) {
        const fileExt = post_data.thumbnail.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `posts/${fileName}`;

        const { error: upload_error } = await supabase.storage.from('tech-vibe files')
          .upload(filePath, post_data.thumbnail);
        const { data } = await supabase.storage.from('tech-vibe files').getPublicUrl(filePath);
        thumbnailURL = data.publicUrl;
      } else if(typeof post_data.thumbnail === "string") {
        thumbnailURL = thumbnailURL;
      }

      //썸네일의 public url을 얻고난 뒤 임시저장 로직 수행
      const { error: save_draft_error } = await supabase
        .from('admin_post')
        .update([
          {
            title: post_data.title,
            content: JSON.stringify(post_data.content),
            main_category: post_data.main_category,
            sub_category: post_data.sub_category,
            thumbnail: thumbnailURL,
            author: res.data.user.id,
            status: POST_STATUS.TEMP,
          },
        ])
        .eq("id", +post_data.id);
      return { status: "save_draft_success" }
    }
  } else {
    return { status: "failed" };
  }
}

export async function onClickPublishPost(post_data: PostData) {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    if (!post_data.title || !post_data.content || !post_data.sub_category || !post_data.thumbnail) {
      return { status: "publish_failed" };
    } else {
      //supabase storage에 파일을 업로드 후 public url을 얻는 과정
      let thumbnailURL: string | null = null;

      if (post_data.thumbnail && post_data.thumbnail instanceof File) {
        const fileExt = post_data.thumbnail.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `posts/${fileName}`;

        const { error: upload_error } = await supabase.storage.from('tech-vibe files')
          .upload(filePath, post_data.thumbnail);
        const { data } = await supabase.storage.from('tech-vibe files').getPublicUrl(filePath);
        thumbnailURL = data.publicUrl;
      } else if(typeof post_data.thumbnail === "string") {
        thumbnailURL = post_data.thumbnail;
      }

      //썸네일의 public url을 얻고난 뒤 임시저장 로직 수행
      const { error: publish_error } = await supabase
        .from('admin_post')
        .update([
          {
            title: post_data.title,
            content: JSON.stringify(post_data.content),
            main_category: post_data.main_category,
            sub_category: post_data.sub_category,
            thumbnail: thumbnailURL,
            author: res.data.user.id,
            status: POST_STATUS.PUBLISH,
          },
        ])
        .eq("id", +post_data.id);
      return { status: "publish_success" }
    }
  } else {
    return { status: "publish_failed" };
  }
}