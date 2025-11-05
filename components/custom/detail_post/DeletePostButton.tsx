import { Button } from "@/components/ui";
import { Trash2 } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";

function DeletePostButton({ id }: { id: string }) {
  return (
    <DeleteDialog id={id}>
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
