"use client";

import { useState } from "react";
import { PostSettingComponent } from "@/components/custom/PostSettingComponent";
import { SaveButtonComponent } from "./SaveButtonComponent";
import { PostAreaComponent } from "./PostAreaComponent";
import { onClickSaveDraft } from "@/app/create/action";
import { Block } from "@blocknote/core";

type Props = {
  id: string;
}

function PostCreateComponent(props: Props) {
  const [ title, setTitle] = useState<string>("");
  const [ content, setContent ] = useState<Block[]>([]);
  const [ main_category, setMainCategory ] = useState<string>("");
  const [ sub_category, setSubCategory ] = useState<string>("");
  const [ thumbnail, setThumbnail ] = useState<File | string | null>(null);

  return (
    <>
      {/*임시저장, 게시 버튼영역*/}
      <SaveButtonComponent post_data={{id: props.id, title, content, main_category, sub_category, thumbnail}} onClickSaveDraft={onClickSaveDraft} />
      {/*게시글 작성하기 영역*/}
      <PostAreaComponent title={title} setTitle={setTitle} setContent={setContent} />
      {/*카테고리, 썸네일 설정 영역 */}
      <PostSettingComponent setMainCategory={setMainCategory} setSubCategory={setSubCategory} setThumbnail={setThumbnail} />
    </>
  );
}

export { PostCreateComponent };