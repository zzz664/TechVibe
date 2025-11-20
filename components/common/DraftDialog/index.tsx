"use client";

import { deletePost } from "@/app/post/action";
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from "@/components/ui";
import { ResponsePostData } from "@/model";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { toast } from "sonner";

dayjs.extend(utc);

interface Props {
  children: React.ReactNode;
  draft_data: ResponsePostData[];
}

function DraftDialog({ children, draft_data }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
            <p className="text-green-500">{draft_data.length}</p>
            <p>건</p>
          </div>
        </div>
        <Separator />
        {draft_data.length > 0 ? (
          <div className="min-h-60 h-60 flex flex-col items-start justify-start gap-2 overflow-y-scroll">
            {draft_data.map((data, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full px-4 py-2 flex items-center justify-between hover:bg-card rounded-xl transition-all duration-500 cursor-pointer"
                >
                  <Link
                    href={`/create/${data.id}`}
                    className="flex items-center gap-3"
                  >
                    <Badge className="w-5 h-5 rounded-sm aspect-square text-white bg-amber-600/85">
                      {index + 1}
                    </Badge>
                    <div className="flex flex-col gap-1">
                      {data.title === "" ? (
                        <p>등록된 제목이 없습니다.</p>
                      ) : (
                        <p>{data.title}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        생성일:{" "}
                        {dayjs(data.created_at)
                          .utc()
                          .format("YYYY.MM.DD HH시 mm분")}
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Badge variant={"outline"}>작성중</Badge>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="text-[0.75rem] h-fit py-1 z-1"
                      onClick={async () => {
                        const res = await deletePost(
                          data.id,
                          data.status,
                          data.thumbnail ?? ""
                        );
                        switch (res.status) {
                          case "delete failed":
                            toast.error("게시글 삭제에 실패했습니다.");
                            break;
                          case "delete success":
                            toast.success("게시글 삭제에 성공했습니다.");
                            break;
                        }
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="min-h-60 flex flex-col items-center justify-center gap-2">
            <p className="text-muted-foreground">
              조회 가능한 정보가 없습니다.
            </p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"outline"} className="border-0">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DraftDialog };
