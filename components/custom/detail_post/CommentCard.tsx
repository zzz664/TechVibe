import { Card, Separator } from "@/components/ui";
import { CommentData } from "@/model";
import dayjs from "dayjs";
import { DeleteCommentButton } from "./DeleteCommentButton";

function CommentCard({
  data,
  user_id,
  post_id,
}: {
  data: CommentData;
  user_id: string | null;
  post_id: string;
}) {
  return (
    <Card className="relative flex flex-col items-start justify-start gap-2 px-5 py-3 border-0 bg-accent/20">
      <div className="absolute top-13/20 left-19/20">
        {user_id && user_id === data.user_id ? (
          <DeleteCommentButton id={data.id} post_id={post_id} />
        ) : null}
      </div>
      <div className="w-full flex items-center justify-between">
        <p>작성자: {data.nickname}</p>
        <p className="text-muted-foreground">
          {dayjs(data.created_at).format("YYYY.MM.DD")}
        </p>
      </div>
      <Separator />
      <p className="h-15 text-muted-foreground">{data.content}</p>
    </Card>
  );
}

export { CommentCard };
