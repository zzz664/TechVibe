import { Label, Separator } from "@/components/ui";
import { Asterisk } from "lucide-react";
import { Children, ReactNode } from "react";

type Props = {
  children?: ReactNode;
}

function PostSettingContainer({ children } : Props) {
  return (
    <section className="h-full w-1/4 flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="text-rose-500/80 font-semibold">STEP.2</span>
        <span className="text-[18px] font-semibold">카테고리 및 썸네일 설정</span>
        <Separator className="mt-6" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">카테고리</Label>
        </div>
        {Children.toArray(children)[0]}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">썸네일</Label>
        </div>
        {Children.toArray(children)[1]}
        {Children.toArray(children)[2]}
      </div>
    </section>
  );
}

export { PostSettingContainer };