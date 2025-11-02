import { Card, Separator } from "@/components/ui";
import { ResponsePostData } from "@/model";
import Image from "next/image";

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
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p>{nickname}</p>
          <div className="flex items-start justify-start gap-2">
            <p className="text-muted-foreground">{post_data?.main_category}</p>
            <Separator
              orientation="vertical"
              className="h-6! text-muted-foreground!"
            />
            <p className="text-muted-foreground">{post_data?.sub_category}</p>
          </div>
        </div>
        <p>조회수/좋아요/댓글</p>
      </div>
    </Card>
  );
}

export { NewPostCard };
