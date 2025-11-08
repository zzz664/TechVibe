import { Card, Separator } from "@/components/ui";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";

function PopularPostCard() {
  return (
    <Card className="w-full h-fit p-4 flex flex-col gap-4 hover:-translate-y-1 cursor-pointer transition-all duration-500">
      <div className="relative w-full h-70 bg-foreground/85 flex items-center rounded-sm">
        <Image
          src="/logo.png"
          alt="@THUMBNAIL"
          width={100}
          height={100}
          className="w-full h-fit"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <h3 className="absolute inset-auto bottom-2 left-2 text-base font-semibold tracking-tight line-clamp-1">
          핫한 게시글 제목이용
        </h3>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="w-27 font-semibold">닉네임</p>
          <p className="text-muted-foreground">2025.11.08</p>
        </div>
        <div className="flex gap-4 items-center justify-start">
          <Separator
            orientation="vertical"
            className="h-12! text-muted-foreground"
          />
          <div className="flex items-start gap-1 text-muted-foreground">
            <ThumbsUp size={20} />
            {0}
          </div>
        </div>
      </div>
    </Card>
  );
}

export { PopularPostCard };
