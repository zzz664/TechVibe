
import { PostSettingComponent } from "@/components/custom/PostSettingComponent";
import { SaveButtonComponent } from "./SaveButtonComponent";
import { PostAreaComponent } from "./PostAreaComponent";

type Props = {
  onClickSaveDraft: () => Promise<void>;
  //onClickPost: () => Promise<void>;
}

function PostCreateComponent(props: Props) {
    return (
    <>
      {/*임시저장, 게시 버튼영역*/}
      <SaveButtonComponent onClickSaveDraft={props.onClickSaveDraft} />
      {/*게시글 작성하기 영역*/}
      <PostAreaComponent />
      {/*카테고리, 썸네일 설정 영역 */}
      <PostSettingComponent />
    </>
  );
}

export { PostCreateComponent };