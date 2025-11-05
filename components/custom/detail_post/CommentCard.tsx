import { Card, Separator } from "@/components/ui";

function CommentCard() {
  return (
    <Card className="flex flex-col items-start justify-start gap-2 px-5 py-3 border-0 bg-accent/20">
      <div className="w-full flex items-center justify-between">
        <p>작성자: test</p>
        <p className="text-muted-foreground">2025.11.03</p>
      </div>
      <Separator />
      <p className="h-15 text-muted-foreground">댓글내용~~~~~~~~~~~~~~~~~~</p>
    </Card>
  );
}

export { CommentCard };
