import { Card } from "@/components/ui";
import { ResponsePostData } from "@/model";
import dayjs from "dayjs";
import { MessageSquareText } from "lucide-react";
import Image from "next/image";

type Props = {
  post_data: ResponsePostData;
  nickname: string;
  comment_count: number;
};

function PostCard({ post_data, nickname, comment_count }: Props) {
  return (
    <Card className="w-full min-h-70 flex flex-col gap-2 pb-4! hover:-translate-y-1 transition-all duration-500">
      <div className="relative w-full h-70">
        <Image
          src={post_data?.thumbnail as string}
          alt="@THUMBNAIL"
          fill
          sizes="100em"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <h3 className="absolute inset-auto bottom-2 left-2 px-2 text-base font-semibold tracking-tight line-clamp-1">
          {post_data.title}
        </h3>
      </div>
      <div className="w-full flex items-center justify-between px-4">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{nickname}</p>
          <p className="text-muted-foreground text-xs">
            {dayjs(post_data.created_at).format("YYYY.MM.DD")}
          </p>
        </div>
        <div className="flex gap-3 items-center text-muted-foreground text-xs">
          <MessageSquareText />
          {comment_count}
        </div>
      </div>
    </Card>
  );
}

export { PostCard };
