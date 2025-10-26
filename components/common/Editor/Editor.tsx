"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { ko } from "@blocknote/core/locales";

export default function Editor() {
  const locale = ko;
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        emptyDocument: "텍스트를 입력하거나 '/'를 입력하여 블록을 추가해보세요.",
      },
    },
  });
  return <BlockNoteView editor={editor}/>;
}