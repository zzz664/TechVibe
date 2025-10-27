"use client";

import { ArrowLeft, FolderClock, Save } from "lucide-react";
import { Button } from "../ui";

type Props = {
  onClickSaveDraft: () => Promise<void>;
  //onClickPost: () => Promise<void>;
}

function SaveButtonComponent(props: Props) {
  return (
    <div className="fixed bottom-10 right-1/2 translate-x-1/2 z-20 flex items-center gap-3">
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button variant={"outline"} onClick={ async () => {
          await props.onClickSaveDraft();
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