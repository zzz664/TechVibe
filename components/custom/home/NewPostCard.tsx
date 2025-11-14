import { Card, Separator } from "@/components/ui";
import { ResponsePostData } from "@/model";
import { MessageSquareText, ThumbsUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Image from "next/image";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  post_data: ResponsePostData;
  nickname: string;
  comment_count: number;
  like_count: number;
};

function parseContent(content: string | undefined, maxCharacter = 200) {
  const parsed_content =
    typeof content === "string" ? JSON.parse(content) : null;

  let result = "";
  for (const block of parsed_content) {
    for (const content of block.content) {
      if (content.text) {
        result += content.text + " ";
      }
      if (result.length >= maxCharacter)
        return result.slice(0, maxCharacter) + "...";
    }
  }
  return result;
}

function NewPostCard({
  post_data,
  nickname,
  comment_count,
  like_count,
}: Props) {
  return (
    <Card className="w-full h-fit p-4 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-500">
      <div className="w-full flex items-start justify-center gap-2">
        <div className="flex-1 flex flex-col items-start justify-start gap-6">
          <h3 className="text-base font-semibold tracking-tight line-clamp-2">
            {post_data?.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {parseContent(post_data?.content)}
          </p>
        </div>
        <Image
          src={post_data?.thumbnail as string}
          alt="@THUMBNAIL"
          width={100}
          height={100}
          priority
          className="w-[100px] h-[100px] aspect-square rounded-2xl object-cover"
        />
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{nickname}</p>
            <div className="flex items-center justify-center text-muted-foreground text-xs">
              <p className="line-clamp-1">
                {dayjs(post_data.created_at).format("YYYY.MM.DD") +
                  " (" +
                  dayjs(post_data.created_at).fromNow() +
                  ")"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <p className="text-muted-foreground text-xs">
              {post_data?.main_category}
            </p>
            <Separator
              orientation="vertical"
              className="h-5! text-muted-foreground!"
            />
            <p className="text-muted-foreground text-xs">
              {post_data?.sub_category}
            </p>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="h-12! text-muted-foreground"
        />
        <div className="flex gap-2 items-center justify-start">
          <div className="flex items-start gap-1 text-muted-foreground">
            <MessageSquareText size={20} />
            {comment_count}
          </div>
          <div className="flex items-start gap-1 text-muted-foreground">
            <ThumbsUp size={20} />
            {like_count}
          </div>
        </div>
      </div>
    </Card>
  );
}

export { NewPostCard };
