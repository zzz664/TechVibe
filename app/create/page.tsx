import { Button, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Separator, Skeleton } from "@/components/ui";
import { ArrowLeft, Asterisk, FolderClock, Save, Trash } from "lucide-react";
import { POST_CATEGORY } from "@/constants/category.constant";

export default function Home() {
  return (
    <main className="w-full h-full min-h-[1024px] flex gap-6 p-6">
      {/*임시저장, 게시 버튼영역*/}
      <div className="fixed bottom-10 right-1/2 translate-x-1/2 z-20 flex items-center gap-3">
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button variant={"outline"} className="bg-amber-700/85! hover:bg-amber-700!">
          <FolderClock />
          임시저장
        </Button>
        <Button variant={"outline"} className="bg-green-700/85! hover:bg-green-700!">
          <Save />
          게시하기
        </Button>
      </div>
      {/*게시글 작성하기 영역*/}
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
          <Input placeholder="제목을 입력하세요" className="h-12 pl-6 text-lg! placeholder:text-lg! placeholder:font-semibold border-0" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Asterisk size={14} className="text-orange-400" />
            <Label className="text-muted-foreground">내용</Label>
          </div>
          <Skeleton className="w-full h-100" />
        </div>
      </section>
      {/*카테고리, 썸네일 설정 영역 */}
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="카테고리를 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리</SelectLabel>
                {POST_CATEGORY.map((item) => {
                  return ( 
                    <SelectItem key={item.id} value={item.sub_category}>
                      {item.label}
                    </SelectItem>
                    );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Asterisk size={14} className="text-orange-400" />
            <Label className="text-muted-foreground">썸네일</Label>
          </div>
          <Skeleton className="w-full aspect-video" />
          <Button variant={"outline"} className="border-0">
            <Trash />
            썸네일 제거
          </Button>
        </div>
      </section>
    </main>
  );
}