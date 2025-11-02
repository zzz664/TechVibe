import { Card, Separator } from "@/components/ui";
import { ResponsePostData } from "@/model";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Image from "next/image";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  post_data: ResponsePostData;
  nickname: string;
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

function NewPostCard({ post_data, nickname }: Props) {
  return (
    <Card className="w-full h-fit p-4 flex flex-col gap-4">
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
          <p className="font-semibold">{nickname}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
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
            <div className="flex items-center justify-center text-muted-foreground text-xs">
              {dayjs(post_data.created_at).format("YYYY.MM.DD")} (
              {dayjs(post_data.created_at).fromNow()})
            </div>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="h-12! text-muted-foreground"
        />
        <p>조회수/좋아요/댓글</p>
      </div>
    </Card>
  );
}

export { NewPostCard };
