import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";
import {
  CommentInput,
  CommentContainer,
  CommentCard,
  ControlButtonContainer,
  BackButton,
  DeletePostButton,
  RecommendationContainer,
} from "@/components/custom";
import { Editor, Sidebar } from "@/components/common";
import { Separator } from "@/components/ui";
import { fetchPublishPostById, fetchUserId } from "../action";
import { LikeData } from "@/model";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = (await params) as { id: string };
  const { userId } = await fetchUserId();
  const { fetch_data } = await fetchPublishPostById(id);
  const like_data = fetch_data?.like.filter((item: LikeData) => {
    return item.user_id === userId;
  });
  const like_count = fetch_data?.like.length;

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col gap-6 items-center">
      {/*썸네일*/}
      <div
        className="relative w-full h-100 bg-cover bg-position-[50%,35%] bg-no-repeat bg-accent"
        style={{
          backgroundImage: `url(${fetch_data?.thumbnail})`,
        }}
      >
        <ControlButtonContainer>
          <BackButton />
          {userId && userId === fetch_data?.author ? (
            <DeletePostButton
              id={id}
              thumbnailURL={fetch_data?.thumbnail as string}
            />
          ) : null}
        </ControlButtonContainer>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <section className="relative w-fit flex flex-col items-center justify-center gap-2 -mt-55 mb-5 backdrop-blur-[3px] rounded-2xl px-4 pb-2 shadow-2xl inset-ring-1 inset-ring-background/10 shadow-background/85">
        <div className="flex items-center justify-center gap-1 mb-4 font-semibold">
          <p>{fetch_data?.main_category}</p>
          <ChevronRight className="w-5 h-5 mt-1" />
          <p>{fetch_data?.sub_category}</p>
        </div>
        <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
          {fetch_data?.title}
        </h1>
        <Separator className="w-10! my-4 bg-foreground border-[1.5px] md:border-2 rounded-xl" />
        <p>{dayjs(fetch_data?.created_at).format("YYYY.MM.DD")}</p>
      </section>
      <section className="w-full flex flex-col sm:flex-row gap-4 px-4">
        <Sidebar />
        <div className="w-full flex flex-col gap-6 px-4">
          <div className="-ml-13">
            <Editor
              initial_content={JSON.parse(fetch_data?.content as string)}
              readonly
            />
          </div>
          <RecommendationContainer
            post_id={id}
            like_count={like_count ?? 0}
            like_data={like_data && like_data?.length > 0 ? like_data[0] : null}
          />
          {/*댓글 영역*/}
          <Separator />
          <CommentContainer>
            {(fetch_data?.comment.length ?? 0) > 0 ? (
              fetch_data?.comment.map((data) => {
                return (
                  <CommentCard
                    key={data.id}
                    data={data}
                    user_id={userId}
                    post_id={id}
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center text-muted-foreground my-5">
                조회 가능한 댓글이 없습니다. 댓글을 남겨보세요.
              </div>
            )}
            <Separator className="mt-5" />
            <CommentInput post_id={id} />
          </CommentContainer>
        </div>
      </section>
    </main>
  );
}
