"use client";

import { deleteComment } from "@/app/post/action";
import { Button } from "@/components/ui";
import { toast } from "sonner";

function DeleteCommentButton({ id, post_id }: { id: string; post_id: string }) {
  return (
    <Button
      onClick={async () => {
        const res = await deleteComment(post_id, id);
        switch (res.status) {
          case "delete failed":
            toast.error("댓글 삭제에 실패했습니다.");
            break;
          case "delete success":
            toast.success("댓글 삭제에 성공했습니다.");
            break;
          default:
            break;
        }
      }}
      variant={"outline"}
      size={"icon"}
      className="text-xs border-0 h-7 bg-red-700/70! hover:bg-red-700/85!"
    >
      삭제
    </Button>
  );
}

export { DeleteCommentButton };
