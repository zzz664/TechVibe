"use client";

import { Asterisk } from "lucide-react";
import { Input, Label, Separator } from "../ui";
import { Editor } from "../common";
import { Block } from "@blocknote/core";

type Props = {
  title: string;
  content: Block[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<Block[]>>;
}

function PostAreaComponent(props: Props) {
  return (
    <section className="h-full w-3/4 flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="text-rose-500/80 font-semibold">STEP.1</span>
        <span className="text-[18px] font-semibold">게시글 작성하기</span>
        <Separator className="mt-6" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">제목</Label>
        </div>
        <Input placeholder="제목을 입력하세요" value={props.title ?? ""} onChange={ e => props.setTitle(e.target.value) } className="h-12 pl-6 text-lg! placeholder:text-lg! placeholder:font-semibold border-0" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">내용</Label>
        </div>
        <Editor content={props.content} setContent={props.setContent}/>
      </div>
    </section>
  );
}

export { PostAreaComponent };