"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { ko } from "@blocknote/core/locales";
import { Block } from "@blocknote/core";
import { useEffect } from "react";
import { usePostStore } from "@/stores";
import { useDebouncing } from "@/hooks";

type Props = {
  initial_content: Block[] | null;
};

export default function Editor({ initial_content }: Props) {
  const { setContent } = usePostStore();
  
  const locale = ko;
  const editor = useCreateBlockNote({
    initialContent: initial_content ?? undefined,
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: "텍스트를 입력하거나 '/'를 입력하여 블록을 추가해보세요.",
      },
    },
  });

  const debounceChange = useDebouncing(() => {
    setContent(editor.document);
  }, 250, [setContent]);

  useEffect(() => {
    if (initial_content) {
      const current = JSON.stringify(editor.document);
      const next = JSON.stringify(initial_content);

      if (current !== next) {
        setContent(initial_content);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <BlockNoteView editor={editor}
    onChange={ debounceChange } />;
}