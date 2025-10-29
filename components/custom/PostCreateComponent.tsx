"use client";

import { useEffect, useState } from "react";
import { PostSettingComponent } from "@/components/custom/PostSettingComponent";
import { SaveButtonComponent } from "./SaveButtonComponent";
import { PostAreaComponent } from "./PostAreaComponent";
import { onClickPublishPost, onClickSaveDraft } from "@/app/create/action";
import { Block } from "@blocknote/core";
import { ResponsePostData } from "@/model";

type Props = {
  id: string;
  post_data?: ResponsePostData | null;
}

function PostCreateComponent(props: Props) {
  const [ title, setTitle] = useState<string>("");
  const [ content, setContent ] = useState<Block[]>([]);
  const [ main_category, setMainCategory ] = useState<string>("");
  const [ sub_category, setSubCategory ] = useState<string>("");
  const [ thumbnail, setThumbnail ] = useState<File | string | null>(null);

  useEffect(() => {
    if(props.post_data) {
      setTitle(props.post_data.title);
      setContent(JSON.parse(props.post_data.content));
      setMainCategory(props.post_data.main_category);
      setSubCategory(props.post_data.sub_category);
      setThumbnail(props.post_data.thumbnail);
    }
  }, [props.post_data]);

  return (
    <>
      {/*임시저장, 게시 버튼영역*/}
      <SaveButtonComponent post_data={{id: props.post_data ? props.post_data.id : props.id, title, content, main_category, sub_category, thumbnail}} onClickSaveDraft={onClickSaveDraft} onClickPublishPost={onClickPublishPost} />
      {/*게시글 작성하기 영역*/}
      <PostAreaComponent title={title} content={content} setTitle={setTitle} setContent={setContent} />
      {/*카테고리, 썸네일 설정 영역 */}
      <PostSettingComponent thumbnail={thumbnail} sub_category={sub_category} setMainCategory={setMainCategory} setSubCategory={setSubCategory} setThumbnail={setThumbnail} />
    </>
  );
}

export { PostCreateComponent };