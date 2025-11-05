import { Button, Textarea } from "@/components/ui";

function CommentInput() {
  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        댓글 작성
      </h3>
      <div className="h-25 flex items-center justify-center gap-4 mb-10">
        <Textarea className="h-full resize-none border-0" />
        <Button
          variant={"outline"}
          className="w-25 h-full bg-green-700/70! hover:bg-green-700/85! text-2xl border-0"
        >
          등록
        </Button>
      </div>
    </div>
  );
}

export { CommentInput };
