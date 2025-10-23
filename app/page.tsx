import { Flame, Newspaper, PencilLine } from "lucide-react";
import { Sidebar } from "../components/common";
import { SkeletonPopularSubject, SkeletonNewSubject } from "../components/skeleton";
import { Button } from "../components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
      <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 items-center">
        <Link href={"/create"}>
          <Button variant={"destructive"} className="px-5! py-5! rounded-full">
            <PencilLine />
            새 게시글 작성하러가기
          </Button>
        </Link>
      </div>
      <Sidebar />
      <section className="flex-1 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Flame className="w-9 h-9 text-amber-600" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">가장 조회수가 높은 게시글</h4>
            </div>
            <p className="md:text-base text-muted-foreground">블로그 주인장의 인기있는 글을 모아봤어요.</p>
            <div className="grid grid-cols-4 gap-6">
              <SkeletonPopularSubject />
              <SkeletonPopularSubject />
              <SkeletonPopularSubject />
              <SkeletonPopularSubject />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Newspaper className="w-9 h-9 text-gray-500" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">최근에 새로 올라온 글</h4>
            </div>
            <p className="md:text-base text-muted-foreground">블로그 주인장이 새로운 글을 썼네요? 한 번 봐볼까요.</p>
            <div className="grid grid-cols-2 gap-6">
              <SkeletonNewSubject />
              <SkeletonNewSubject />
              <SkeletonNewSubject />
              <SkeletonNewSubject />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
