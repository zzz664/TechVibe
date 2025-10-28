"use client";

import { NotebookPen } from "lucide-react";
import { Button } from "../ui";
import { toast } from "sonner";

type Props = {
  onClickDraftList: () => Promise<{ status: string } | undefined>;
}

function DraftListButton(props: Props) {
  return (
    <Button variant={"outline"} onClick={async () => {
          const res = await props.onClickDraftList();
          if (res?.status === "failed") {
            toast.error("관리자 로그인이 필요한 기능입니다.");
          }
        }} className="w-10 h-10 rounded-full">
          <NotebookPen />
    </Button>
  );
}

export { DraftListButton };