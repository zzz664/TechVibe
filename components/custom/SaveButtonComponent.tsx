"use client";

import { ArrowLeft, FolderClock, Save } from "lucide-react";
import { Button } from "../ui";
import { PostData } from "@/model";
import { toast } from "sonner";

type Props = {
  post_data: PostData;
  onClickSaveDraft: (post_data: PostData) => Promise<void | { status: string}>;
  //onClickPost: () => Promise<void>;
}

function SaveButtonComponent(props: Props) {
  return (
    <div className="fixed bottom-10 right-1/2 translate-x-1/2 z-20 flex items-center gap-3">
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button variant={"outline"} onClick={ async () => {
          const res = await props.onClickSaveDraft(props.post_data);
          if(res?.status === "save_draft_failed") {
            toast.error("임시저장에 실패했습니다. 빈 항목이 없는지 확인해주세요.");
          } else {
            toast.success("게시글이 임시저장 되었습니다.");
          }
        }} className="bg-amber-700/85! hover:bg-amber-700!">
          <FolderClock />
          임시저장
        </Button>
        <Button variant={"outline"} onClick={ async () => {
          //await props.onClickPost();
        }} className="bg-green-700/85! hover:bg-green-700!">
          <Save />
          게시하기
        </Button>
      </div>
  );
}

export { SaveButtonComponent };