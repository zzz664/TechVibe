import { Card, Separator } from "@/components/ui";
import { CommentData } from "@/model";
import dayjs from "dayjs";

function CommentCard({ data }: { data: CommentData }) {
  return (
    <Card className="flex flex-col items-start justify-start gap-2 px-5 py-3 border-0 bg-accent/20">
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
