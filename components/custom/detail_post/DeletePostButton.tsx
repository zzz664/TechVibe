import { Button } from "@/components/ui";
import { Trash2 } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";

function DeletePostButton({
  id,
  thumbnailURL,
}: {
  id: string;
  thumbnailURL: string;
}) {
  return (
    <DeleteDialog id={id} thumbnailURL={thumbnailURL}>
      <Button
        variant={"outline"}
        size={"icon"}
        className="bg-red-600/75! hover:bg-red-600/85!"
      >
        <Trash2 />
      </Button>
    </DeleteDialog>
  );
}

export { DeletePostButton };
