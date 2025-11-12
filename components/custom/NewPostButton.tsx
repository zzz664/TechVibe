"use client";

import { PencilLine } from "lucide-react";
import { Button } from "../ui";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";

type Props = {
  onClickNewPost: (
    user_id: string | null | undefined
  ) => Promise<{ status: string; url?: string }>;
};

function NewPostButton(props: Props) {
  const router = useRouter();
  const { user_id } = useAuthStore();

  return (
    <Button
      onClick={async () => {
        const res = await props.onClickNewPost(user_id);
        if (res?.status === "failed") {
          toast.error("관리자 로그인이 필요한 기능입니다.");
        } else if (res?.status === "success") {
          router.push(res?.url as string);
        }
      }}
      className="px-5! py-5! rounded-full text-white bg-destructive/70! hover:bg-destructive/85!"
    >
      <PencilLine />새 게시글 작성하러가기
    </Button>
  );
}

export { NewPostButton };
