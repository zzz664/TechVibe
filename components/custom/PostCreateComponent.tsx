"use client";

import { useEffect, useState, useRef } from "react";
import { SaveButtonComponent } from "./SaveButtonComponent";
import { onClickPublishPost, onClickSaveDraft } from "@/app/create/action";
import { Block } from "@blocknote/core";
import { ResponsePostData } from "@/model";
import { Editor } from "../common";
import { PostAreaContainer, PostSettingContainer, CategorySelector, ThumnailSelector } from "@/components/custom";
import { TitleInput } from "./CreatePost/TitleInput";

type Props = {
  id: string;
  post_data?: ResponsePostData | null;
}

function PostCreateComponent(props: Props) {

  return (
    <>
      {/*임시저장, 게시 버튼영역*/}
      {<SaveButtonComponent
        id={props.post_data ? props.post_data.id : props.id}
        onClickSaveDraft={onClickSaveDraft}
        onClickPublishPost={onClickPublishPost} />}
      {/*게시글 작성하기 영역*/}
      <PostAreaContainer>
        <TitleInput initial_title={props.post_data?.title ?? ""} />
        <Editor initial_content={JSON.parse(props.post_data?.content as string)} />
      </PostAreaContainer>
      {/*카테고리, 썸네일 설정 영역 */}
      <PostSettingContainer>
        <CategorySelector
          initial_main_category={props.post_data?.main_category as string}
          initial_sub_category={props.post_data?.sub_category as string} />
        <ThumnailSelector
          initial_thumbnail={props.post_data?.thumbnail as string | null} />
      </PostSettingContainer>
    </>
  );
}

export { PostCreateComponent };