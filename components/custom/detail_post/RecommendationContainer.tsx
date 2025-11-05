"use client";

import { updateLikeStatus } from "@/app/post/action";
import { Button } from "@/components/ui";
import { LikeData } from "@/model";
import { ThumbsUp } from "lucide-react";
import { toast } from "sonner";

function RecommendationContainer({
  post_id,
  like_count,
  like_data,
}: {
  post_id: string;
  like_count: number;
  like_data: LikeData | null;
}) {
  return (
    <div className="flex gap-4 items-center justify-center mb-5">
      <Button
        onClick={async () => {
          const current = like_data ? like_data.status : false;
          const res = await updateLikeStatus(
            post_id,
            like_data?.id ?? "",
            current
          );
          switch (res.status) {
            case "auth failed":
              toast.error("좋아요는 로그인 후 가능합니다.");
              break;
            case "failed":
              toast.error("좋아요 상태 업데이트 실패.");
              break;
            case "success":
              toast.success("좋아요 상태 업데이트 성공.");
              break;
            default:
              break;
          }
        }}
        variant={"outline"}
        className={
          like_data && like_data.status
            ? "w-17 h-17! text-red-400 font-extrabold hover:text-red-400 border-muted-foreground/10! bg-red-400/10! hover:bg-red-400/25!"
            : "w-17 h-17! text-red-400 font-extrabold hover:text-red-400 border-muted-foreground/10!"
        }
      >
        <ThumbsUp />
        {like_count}
      </Button>
    </div>
  );
}

export { RecommendationContainer };
