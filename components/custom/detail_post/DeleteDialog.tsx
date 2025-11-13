"use client";

import { deletePost } from "@/app/post/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteDialog({
  children,
  id,
  thumbnailURL,
}: {
  children: React.ReactNode;
  id: string;
  thumbnailURL: string;
}) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>{children}</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 게시글을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-red-700 font-extrabold">
              게시글을 삭제하면 복구할 수 없습니다.
            </span>
            <br />
            게시글과 댓글들은 서버에서 완전히 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const res = await deletePost(id, thumbnailURL);
              switch (res.status) {
                case "delete failed":
                  toast.error("게시글 삭제에 실패했습니다.");
                  break;
                case "delete success":
                  toast.success("게시글 삭제에 성공했습니다.");
                  router.push("/");
                  break;
              }
            }}
          >
            계속
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteDialog };
