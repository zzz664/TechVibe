import { Label, Separator } from "@/components/ui";
import { Asterisk } from "lucide-react";
import { Children, ReactNode } from "react";

type Props = {
  children?: ReactNode;
}

function PostAreaContainer({ children }: Props) {
  console.log("PostAreaContainer");
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
        {Children.toArray(children)[0]}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">내용</Label>
        </div>
        {Children.toArray(children)[1]}
      </div>
    </section>
  );
}

export { PostAreaContainer };