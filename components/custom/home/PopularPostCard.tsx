import { Card, Separator } from "@/components/ui";
import { ResponsePostData } from "@/model";
import dayjs from "dayjs";
import Image from "next/image";

type Props = {
  post_data: ResponsePostData;
  nickname: string;
  like_count: number;
};

function PopularPostCard({ post_data, nickname, like_count }: Props) {
  return (
    <Card className="w-full h-fit flex flex-col gap-4 hover:-translate-y-1 transition-all duration-500">
      <div className="relative w-full h-70 bg-card flex items-center">
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
      <div className="w-full px-4 flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{nickname}</p>
          <p className="text-muted-foreground">
            {dayjs(post_data.created_at).format("YYYY.MM.DD")}
          </p>
        </div>
        <div className="flex gap-4 items-center justify-start">
          <Separator
            orientation="vertical"
            className="h-12! text-muted-foreground"
          />
          <div className="flex items-start text-muted-foreground text-xs font-semibold">
            좋아요:&nbsp;
            {like_count}
          </div>
        </div>
      </div>
    </Card>
  );
}

export { PopularPostCard };
