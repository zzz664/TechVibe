import { ResponsePostDataPlus } from "@/model";
import Link from "next/link";
import { use } from "react";
import { NewPostCard } from "./NewPostCard";

function NewPostList({
  new_post_promise,
}: {
  new_post_promise: Promise<{
    status: string;
    post_data?: ResponsePostDataPlus[];
  }>;
}) {
  const new_post = use(new_post_promise);

  const renderRecentPost = () => {
    if (new_post.post_data && new_post.post_data.length > 0) {
      return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {new_post.post_data.map((data: ResponsePostDataPlus) => {
            return (
              <Link key={data.id} href={`/post/${data.id}`}>
                <NewPostCard
                  post_data={data}
                  nickname={data.user.nickname}
                  comment_count={data.comment[0].count}
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

  return <>{renderRecentPost()}</>;
}

export { NewPostList };
