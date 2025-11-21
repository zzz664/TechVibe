import { ResponsePostDataPlus } from "@/model";
import Link from "next/link";
import { use } from "react";
import { PopularPostCard } from "./PopularPostCard";

function PopularPostList({
  popular_post_promise,
}: {
  popular_post_promise: Promise<{
    status: string;
    post_data?: ResponsePostDataPlus[];
  }>;
}) {
  const popular_post = use(popular_post_promise);

  const renderPopularPost = () => {
    if (popular_post.post_data && popular_post.post_data.length > 0) {
      return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {popular_post.post_data.map((data: ResponsePostDataPlus) => {
            return (
              <Link key={data.id} href={`/post/${data.id}`}>
                <PopularPostCard
                  post_data={data}
                  nickname={data.user.nickname}
                  like_count={data.like[0].count}
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

  return <>{renderPopularPost()}</>;
}

export { PopularPostList };
