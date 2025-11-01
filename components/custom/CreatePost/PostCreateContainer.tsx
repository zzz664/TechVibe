"use client";

import { ResponsePostData } from "@/model";
import { usePostStore } from "@/stores";
import { ReactNode, useEffect, useCallback } from "react";

type Props = {
  original_data: ResponsePostData | null;
  children?: ReactNode;
}

function PostCreateContainer({ original_data, children }: Props) {
  const { setTitle, setContent, setMainCategory, setSubCategory, setThumbnail } = usePostStore();

  const setOriginalData = useCallback(() => {
    if (original_data) {
      setTitle(original_data.title);
      setContent(JSON.parse(original_data.content));
      setMainCategory(original_data.main_category);
      setSubCategory(original_data.sub_category);
      setThumbnail(original_data.thumbnail);
    }
  }, [original_data, setTitle, setContent, setMainCategory, setSubCategory, setThumbnail]);

  useEffect(() => {
    setOriginalData();
    return (() => {
      usePostStore.persist.clearStorage();
    });
  }, [setOriginalData]);

  return (
    <main className="w-full h-full min-h-[1024px] flex gap-6 p-6">
      {children}
    </main>
  );
}

export { PostCreateContainer }