"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, FolderClock, Save } from "lucide-react";
import { Button } from "../ui";
import { PostData } from "@/model";
import { toast } from "sonner";
import { usePostStore } from "@/stores";

type Props = {
  id: string;
  onClickSaveDraft: (post_data: PostData) => Promise<void | { status: string }>;
  onClickPublishPost: (
    post_data: PostData
  ) => Promise<void | { status: string }>;
};

function SaveButtonComponent({
  id,
  onClickSaveDraft,
  onClickPublishPost,
}: Props) {
  const router = useRouter();
  const { postData } = usePostStore();
  return (
    <div className="fixed bottom-10 right-1/2 translate-x-1/2 z-20 flex items-center gap-3">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant={"outline"}
        onClick={async () => {
          const res = await onClickSaveDraft({ ...postData, id: id });

          if (res?.status === "save_draft_failed") {
            toast.error(
              "임시저장에 실패했습니다. 빈 항목이 없는지 확인해주세요."
            );
          } else {
            toast.success("게시글이 임시저장 되었습니다.");
          }
        }}
        className="bg-amber-700/85! hover:bg-amber-700!"
      >
        <FolderClock />
        임시저장
      </Button>
      <Button
        variant={"outline"}
        onClick={async () => {
          const res = await onClickPublishPost({ ...postData, id: id });

          if (res?.status === "publish_failed") {
            toast.error("빈 항목이 존재하여 게시에 실패했습니다.");
          } else {
            router.replace("/");
            toast.success("성공적으로 게시하였습니다.");
          }
        }}
        className="bg-green-700/85! hover:bg-green-700!"
      >
        <Save />
        게시하기
      </Button>
    </div>
  );
}

export { SaveButtonComponent };
