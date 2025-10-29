import { Block } from "@blocknote/core";

export enum POST_STATUS {
  TEMP = "temp",
  PUBLISH = "publish",
}

interface PostData {
  id: string;
  title: string;
  content: Block[];
  main_category: string;
  sub_category: string;
  thumbnail: File | string | null;
}

interface ResponsePostData {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: Date | string;
  main_category: string;
  sub_category: string;
  thumbnail: string | null;
  status: POST_STATUS;
}

export type { PostData, ResponsePostData }