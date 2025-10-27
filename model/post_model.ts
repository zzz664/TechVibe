import { Block } from "@blocknote/core";

interface PostData {
  id: string;
  title: string;
  content: Block[];
  main_category: string;
  sub_category: string;
  thumbnail: File | string | null;
}

export type { PostData };