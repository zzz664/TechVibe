import { handleDraftList } from "@/app/action";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@/components/ui";

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
            <DialogTitle>임시 저장된 게시글글 목록</DialogTitle>
            <DialogDescription>
              임시 저장된 게시글을 이어 작성하거나 삭제 할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
}

export { DraftDialog };