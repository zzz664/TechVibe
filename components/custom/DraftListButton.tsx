import { CircleSmall, NotebookPen } from "lucide-react";
import { Button } from "../ui";

type Props = {
  existDraft: boolean;
}

function DraftListButton(props: Props) {
  return (
    <>
      <Button variant={"outline"} className="w-10 h-10 rounded-full">
        <NotebookPen />
      </Button>
      { props.existDraft ? <CircleSmall size={14} className="absolute bottom-4/6 left-4/6 text-red-500" fill="#FB2C36" /> : null }
    </>
  );
}

export { DraftListButton };