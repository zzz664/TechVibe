import { CategorySelector, PostAreaContainer, PostSettingContainer, ThumnailSelector } from "@/components/custom";
import { fetchPostById, onClickPublishPost, onClickSaveDraft } from "../action";
import { SaveButtonComponent } from "@/components/custom/SaveButtonComponent";
import { TitleInput } from "@/components/custom/CreatePost/TitleInput";
import { Editor } from "@/components/common";

export default async function Home({ params }: { params: { id: string }}) {
  {/*params가 thenable(이 상태에선 undefined로 나옴)일 수 있으므로 타입을 명시하여 await를 사용*/}
  const { id } = await params as { id: string };
  const { fetch_data } = await fetchPostById(+id);
  return (
    <main className="w-full h-full min-h-[1024px] flex gap-6 p-6">
      {/*임시저장, 게시 버튼영역*/}
      {<SaveButtonComponent
        id={fetch_data ? fetch_data.id : id}
        onClickSaveDraft={onClickSaveDraft}
        onClickPublishPost={onClickPublishPost} />}
      {/*게시글 작성하기 영역*/}
      <PostAreaContainer>
        <TitleInput initial_title={fetch_data?.title as string} />
        <Editor initial_content={JSON.parse(fetch_data?.content as string)} />
      </PostAreaContainer>
      {/*카테고리, 썸네일 설정 영역 */}
      <PostSettingContainer>
        <CategorySelector
          initial_main_category={fetch_data?.main_category as string}
          initial_sub_category={fetch_data?.sub_category as string} />
        <ThumnailSelector
          initial_thumbnail={fetch_data?.thumbnail as string | null} />
      </PostSettingContainer>
    </main>
  );
}