import { Flame, Newspaper } from "lucide-react";
import { Sidebar } from "../components/common";
import {
  fetchPopularPost,
  handleDraftList,
  handleRecentPostList,
  onClickNewPost,
} from "./action";
import {
  NewPostButton,
  PopularPostList,
  NewPostList,
  DraftList,
  PostListSkeleton,
} from "@/components/custom";
import { Suspense } from "react";

export default async function Home() {
  const draft_promise = handleDraftList();
  const new_post_promise = handleRecentPostList();
  const popular_post_promise = fetchPopularPost();

  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
      <div className="flex gap-2 fixed right-1/2 bottom-10 translate-x-1/2 z-5 items-center">
        <NewPostButton onClickNewPost={onClickNewPost} />
        <DraftList draft_promise={draft_promise} />
      </div>
      <Sidebar />
      <section className="flex-1 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Flame className="w-9 h-9 text-amber-600" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                좋아요가 높은 게시글 TOP 4
              </h4>
            </div>
            <p className="md:text-base text-muted-foreground">
              블로그 주인장의 인기있는 글을 모아봤어요.
            </p>
            <Suspense
              fallback={<PostListSkeleton content="인기 게시글 로딩중..." />}
            >
              <PopularPostList popular_post_promise={popular_post_promise} />
            </Suspense>
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
            <Suspense
              fallback={<PostListSkeleton content="최신 게시글 로딩중..." />}
            >
              <NewPostList new_post_promise={new_post_promise} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
