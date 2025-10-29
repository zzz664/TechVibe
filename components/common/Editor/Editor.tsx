"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { ko } from "@blocknote/core/locales";
import { Block } from "@blocknote/core";
import { useEffect } from "react";

type Props = {
  content: Block[] | null;
  setContent: React.Dispatch<React.SetStateAction<Block[]>>;
};

export default function Editor(props: Props) {
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

  useEffect(() => {
    if(props.content) {
      const current = JSON.stringify(editor.document);
      const next = JSON.stringify(props.content);

      if(current !== next) {
        editor.replaceBlocks(editor.document, props.content);
      }
    }
  }, [props.content, editor]);

  return <BlockNoteView editor={editor} onChange={() => props.setContent(editor.document)}/>;
}