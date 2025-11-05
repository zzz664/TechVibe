import dayjs from "dayjs";
import { ArrowLeft, ChevronRight, Trash2 } from "lucide-react";
import {
  CommentInput,
  CommentContainer,
  CommentCard,
} from "@/components/custom";
import { Editor, Sidebar } from "@/components/common";
import { Button, Separator } from "@/components/ui";
import { fetchPublishPostById, fetchUserId } from "../action";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = (await params) as { id: string };
  const { fetch_data } = await fetchPublishPostById(+id);
  const { userId } = await fetchUserId();

  const renderDeleteButton = () => {
    if (userId && userId === fetch_data?.author) {
      return (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-red-600/75! hover:bg-red-600/85!"
        >
          <Trash2 />
        </Button>
      );
    }
  };

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col gap-6">
      {/*썸네일*/}
      <div
        className="relative w-full h-100 bg-cover bg-position-[50%,35%] bg-no-repeat bg-accent"
        style={{
          backgroundImage: `url(${fetch_data?.thumbnail})`,
        }}
      >
        <div className="absolute top-7 left-7 z-9 flex gap-2">
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeft />
          </Button>
          {renderDeleteButton()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <section className="relative w-full flex flex-col items-center justify-center gap-2 -mt-50">
        <div className="flex items-center justify-center gap-1 mb-4">
          <p className="text-muted-foreground">{fetch_data?.main_category}</p>
          <ChevronRight className="w-5 h-5 mt-1 text-muted-foreground" />
          <p className="text-muted-foreground">{fetch_data?.sub_category}</p>
        </div>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          {fetch_data?.title}
        </h1>
        <Separator className="w-10! my-4 bg-foreground border-2 rounded-xl" />
        <p>{dayjs(fetch_data?.created_at).format("YYYY.MM.DD")}</p>
      </section>
      <section className="w-full flex gap-4">
        <Sidebar />
        <div className="w-[80%] flex flex-col gap-6">
          <Editor
            initial_content={JSON.parse(fetch_data?.content as string)}
            readonly
          />
          {/*댓글 영역*/}
          <Separator />
          <CommentContainer>
            {(fetch_data?.comment.length ?? 0) > 0 ? (
              fetch_data?.comment.map((data) => {
                return <CommentCard key={data.id} data={data} />;
              })
            ) : (
              <div>응 없어</div>
            )}
            <Separator className="mt-5" />
            <CommentInput post_id={id} />
          </CommentContainer>
        </div>
      </section>
    </main>
  );
}
