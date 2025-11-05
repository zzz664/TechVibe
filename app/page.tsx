import { Flame, Newspaper } from "lucide-react";
import { DraftDialog, Sidebar } from "../components/common";
import { SkeletonPopularSubject } from "../components/skeleton";
import {
  handleDraftList,
  handleRecentPostList,
  onClickNewPost,
} from "./action";
import {
  NewPostButton,
  DraftListButton,
  NewPostCard,
} from "@/components/custom";
import { ResponsePostData, ResponsePostDataPlus } from "@/model";
import Link from "next/link";

export default async function Home() {
  const draft_res = await handleDraftList();
  const recent_post_res = await handleRecentPostList();

  const renderDraftDialog = () => {
    if (draft_res.status === "success") {
      const existDraft =
        (draft_res.draft_data?.length as number) > 0 ? true : false;
      return (
        <DraftDialog draft_data={draft_res.draft_data as ResponsePostData[]}>
          <div className="relative">
            <DraftListButton existDraft={existDraft} />
          </div>
        </DraftDialog>
      );
    } else if (draft_res.status === "failed") {
      return (
        <fieldset disabled>
          <div className="relative">
            <DraftListButton existDraft={false} />
          </div>
        </fieldset>
      );
    }
  };

  const renderRecentPost = () => {
    if (recent_post_res.post_data && recent_post_res.post_data.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-6">
          {recent_post_res.post_data.map((data: ResponsePostDataPlus) => {
            return (
              <Link key={data.id} href={`/post/${data.id}`}>
                <NewPostCard
                  post_data={data}
                  nickname={data.user.nickname}
                  comment_count={data.comment[0].count}
                />
              </Link>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="w-full min-h-140 flex items-center justify-center text-muted-foreground">
          발행 된 게시글이 존재하지 않습니다.
        </div>
      );
    }
  };

  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
      <div className="flex gap-2 fixed right-1/2 bottom-10 translate-x-1/2 z-20 items-center">
        <NewPostButton onClickNewPost={onClickNewPost} />
        {renderDraftDialog()}
      </div>
      <Sidebar />
      <section className="flex-1 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Flame className="w-9 h-9 text-amber-600" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                가장 조회수가 높은 게시글
              </h4>
            </div>
            <p className="md:text-base text-muted-foreground">
              블로그 주인장의 인기있는 글을 모아봤어요.
            </p>
            <div className="grid grid-cols-4 gap-6">
              <SkeletonPopularSubject />
              <SkeletonPopularSubject />
              <SkeletonPopularSubject />
              <SkeletonPopularSubject />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <Newspaper className="w-9 h-9 text-gray-500" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                최근에 새로 올라온 글
              </h4>
            </div>
            <p className="md:text-base text-muted-foreground">
              블로그 주인장이 새로운 글을 썼네요? 한 번 봐볼까요.
            </p>
            {renderRecentPost()}
          </div>
        </div>
      </section>
    </main>
  );
}
