import { DraftDialog } from "@/components/common";
import { DraftListButton } from "../DraftListButton";
import { ResponsePostData } from "@/model";
import { use } from "react";

function DraftList({
  draft_promise,
}: {
  draft_promise: Promise<{
    status: string;
    draft_data?: ResponsePostData[] | null;
  }>;
}) {
  const draft = use(draft_promise);

  const renderDraftDialog = () => {
    if (draft.status === "success") {
      const existDraft =
        (draft.draft_data?.length as number) > 0 ? true : false;
      return (
        <DraftDialog draft_data={draft.draft_data as ResponsePostData[]}>
          <div className="relative">
            <DraftListButton existDraft={existDraft} />
          </div>
        </DraftDialog>
      );
    } else if (draft.status === "failed") {
      return (
        <fieldset disabled>
          <div className="relative">
            <DraftListButton existDraft={false} />
          </div>
        </fieldset>
      );
    }
  };

  return <>{renderDraftDialog()}</>;
}

export { DraftList };
