
import { PostSettingComponent } from "@/components/custom/PostSettingComponent";
import { SaveButtonComponent } from "./SaveButtonComponent";
import { PostAreaComponent } from "./PostAreaComponent";
import { useState } from "react";

type Props = {
  onClickSaveDraft: () => Promise<void>;
  //onClickPost: () => Promise<void>;
}

function PostCreateComponent(props: Props) {
  const [ title, setTitle] = useState<string>("");
  const [ content, setContent ] = useState<string>("");
  const [ main_category, setMainCategory ] = useState<string>("");
  const [ sub_category, setSubCategory ] = useState<string>("");
  const [ thumbnail, setThumbnail ] = useState<File | string | null>(null);

  return (
    <>
      {/*임시저장, 게시 버튼영역*/}
      <SaveButtonComponent onClickSaveDraft={props.onClickSaveDraft} />
      {/*게시글 작성하기 영역*/}
      <PostAreaComponent setTitle={setTitle} setContent={setContent} />
      {/*카테고리, 썸네일 설정 영역 */}
      <PostSettingComponent />
    </>
  );
}

export { PostCreateComponent };