"use client";

import { PencilLine } from "lucide-react";
import { Button } from "../ui";
import { toast } from "sonner";

type Props = {
  onClickNewPost: () => Promise<{ status: string } | undefined>;
}

function NewPostButton(props: Props) {
  return (
    <Button variant={"destructive"} onClick={async () => {
          const res = await props.onClickNewPost();
          if (res?.status === "failed") {
            toast.error("관리자 로그인이 필요한 기능입니다.");
          }
        }} className="px-5! py-5! rounded-full">
          <PencilLine />
          새 게시글 작성하러가기
    </Button>
  );
}

export { NewPostButton };