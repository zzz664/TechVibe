"use client";

import { Button, Textarea } from "@/components/ui";
import { saveComment } from "@/app/post/action";
import { useRef } from "react";
import { toast } from "sonner";

function CommentInput({ post_id }: { post_id: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        댓글 작성
      </h3>
      <div className="h-25 flex items-center justify-center gap-4 mb-10">
        <Textarea className="h-full resize-none border-0" ref={textareaRef} />
        <Button
          onClick={async () => {
            const res = await saveComment(
              post_id,
              textareaRef.current?.value ?? ""
            );
            switch (res.status) {
              case "blank content":
                toast.error("댓글은 빈 칸으로 등록할 수 없습니다.");
                break;
              case "auth failed":
                toast.error("댓글은 로그인을 해야 등록할 수 있습니다.");
                break;
              case "save failed":
                toast.error("댓글 등록에 실패했습니다.");
                break;
              case "success":
                toast.success("댓글 등록에 성공했습니다.");
                break;
              default:
                break;
            }
          }}
          variant={"outline"}
          className="w-25 h-full bg-green-700/70! hover:bg-green-700/85! text-2xl border-0"
        >
          등록
        </Button>
      </div>
    </div>
  );
}

export { CommentInput };
