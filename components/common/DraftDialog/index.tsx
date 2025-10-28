import { handleDraftList } from "@/app/action";
import { Badge, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Separator } from "@/components/ui";

interface Props {
  children: React.ReactNode;
  handleDraftList: () => Promise<{ status: string } | undefined>;
}

async function DraftDialog({ children }: Props) {
  const res = await handleDraftList();
  if (res?.status === "success") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>임시 저장된 게시글 목록</DialogTitle>
            <DialogDescription>
              임시 저장된 게시글을 이어 작성하거나 삭제 할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <div className="flex items-center gap-2">
              <p>임시 저장</p>
              <p className="text-green-500">10</p>
              <p>건</p>
            </div>
          </div>
          <Separator />
          <div className="min-h-60 flex items-center justify-center">
            <p className="text-muted-foreground">조회 가능한 정보가 없습니다.</p>
          </div>
          <div className="min-h-60 flex flex-col items-start justify-center gap-2">
            <div className="w-full px-4 py-2 flex items-center justify-between hover:bg-card rounded-xl transition-all duration-500 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge className="w-5 h-5 rounded-sm aspect-square text-white bg-amber-600/85">1</Badge>
                <div className="flex flex-col gap-1">
                  <p>제목: 등록된 제목이 없습니다.</p>
                  <p className="text-xs text-muted-foreground">생성일: 2025.10.28</p>
                </div>
              </div>
              <Badge variant={"outline"}>작성중</Badge>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"outline"} className="border-0">닫기</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}

export { DraftDialog };