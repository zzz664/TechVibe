import { NotebookPen } from "lucide-react";
import { Button } from "../ui";

function DraftListButton() {
  return (
    <>
      <Button variant={"outline"} className="w-10 h-10 rounded-full">
        <NotebookPen />
      </Button>
    </>
  );
}

export { DraftListButton };