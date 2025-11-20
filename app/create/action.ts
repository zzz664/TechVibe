"use server";

import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";
import { PostData } from "@/model";
import { POST_STATUS, ResponsePostData } from "@/model/post_model";
import { SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { Buffer } from "buffer";

export async function fetchPostById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_post")
    .select("*")
    .eq("id", id);

  const post_data: ResponsePostData = data?.[0] as ResponsePostData;

  if (error) {
    return { fetch_data: null, status: "failed" };
  }

  return { fetch_data: post_data, status: "success" };
}

export async function onClickSaveDraft(post_data: PostData) {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    if (
      !post_data.title &&
      !post_data.content &&
      !post_data.sub_category &&
      !post_data.thumbnail
    ) {
      return { status: "save_draft_failed" };
    } else {
      const admin_res = await supabase
        .from("user")
        .select("isAdmin")
        .eq("id", res.data.user.id)
        .single();
      if (admin_res.data?.isAdmin) {
        //supabase storage에 파일을 업로드 후 public url을 얻는 과정
        let thumbnailURL: string | null = null;

        if (post_data.thumbnail && post_data.thumbnail instanceof File) {
          thumbnailURL = await uploadThumbnail(supabase, post_data.thumbnail);
          if (!thumbnailURL) return { status: "publish_failed" };
        } else if (typeof post_data.thumbnail === "string") {
          thumbnailURL = post_data.thumbnail;
        }

        //썸네일의 public url을 얻고난 뒤 임시저장 로직 수행
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { error: save_draft_error } = await supabase
          .from("admin_post")
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
        return { status: "save_draft_success" };
      } else {
        return { status: "not admin" };
      }
    }
  } else {
    return { status: "failed" };
  }
}

export async function onClickPublishPost(post_data: PostData) {
  const supabase = await createClient();

  const res = await supabase.auth.getUser();
  if (res.data.user) {
    if (
      !post_data.title ||
      !post_data.content ||
      !post_data.sub_category ||
      !post_data.thumbnail
    ) {
      return { status: "publish_failed" };
    } else {
      const admin_res = await supabase
        .from("user")
        .select("isAdmin")
        .eq("id", res.data.user.id)
        .single();
      if (admin_res.data?.isAdmin) {
        //supabase storage에 파일을 업로드 후 public url을 얻는 과정
        let thumbnailURL: string | null = null;

        if (post_data.thumbnail && post_data.thumbnail instanceof File) {
          thumbnailURL = await uploadThumbnail(supabase, post_data.thumbnail);
          if (!thumbnailURL) return { status: "publish_failed" };
        } else if (typeof post_data.thumbnail === "string") {
          thumbnailURL = post_data.thumbnail;
        }

        //썸네일의 public url을 얻고난 뒤 발행 로직 수행
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { error: publish_error } = await supabase
          .from("admin_post")
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
        return { status: "publish_success" };
      } else {
        return { status: "not admin" };
      }
    }
  } else {
    return { status: "publish_failed" };
  }
}

async function uploadThumbnail(
  supabase: SupabaseClient,
  thumbnail: File
): Promise<string | null> {
  const MAX_SIZE = 1200;
  const fileName = `${nanoid()}.webp`;
  const filePath = `posts/${fileName}`;

  {
    /*이미지 최적화 단계*/
  }
  //File -> Node.js Buffer 변환: sharp 라이브러리 사용을 위함
  const arrayBuffer = await thumbnail.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  //이미지의 동적인 비율 조정을 위한 메타데이터 변수
  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) return null;

  let target_width = metadata.width;
  let target_height = metadata.height;

  //이미지의 가로나 세로가 MAX_SIZE를 넘어가는 경우 비율을 유지하며 리사이징
  if (metadata.width > MAX_SIZE || metadata.height > MAX_SIZE) {
    if (metadata.width >= metadata.height) {
      target_width = MAX_SIZE;
      target_height = Math.round((metadata.height / metadata.width) * MAX_SIZE);
    } else {
      target_width = Math.round((metadata.width / metadata.height) * MAX_SIZE);
      target_height = MAX_SIZE;
    }
  }

  const webpBuffer = await image
    .resize(target_width, target_height, { fit: "inside" })
    .webp({ quality: 90 })
    .toBuffer();

  const { error: upload_error } = await supabase.storage
    .from("tech-vibe files")
    .upload(filePath, webpBuffer, {
      contentType: "image/webp",
      cacheControl: "3600",
      upsert: false,
    });

  if (upload_error) return null;

  const { data } = supabase.storage
    .from("tech-vibe files")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
