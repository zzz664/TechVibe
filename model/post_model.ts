import { Block } from "@blocknote/core";

export enum POST_STATUS {
  TEMP = "temp",
  PUBLISH = "publish",
}

interface PostData {
  id: string;
  title: string | null;
  content: Block[] | null;
  main_category: string | null;
  sub_category: string | null;
  thumbnail: File | string | null;
}

interface CommentData {
  id: string;
  created_at: string;
  content: string;
  nickname: string;
  user_id: string;
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

interface ResponsePostDataPlus extends ResponsePostData {
  user: { nickname: string };
  comment: [{ count: number }];
}

interface ResponsePostDataWithComment extends ResponsePostData {
  comment: CommentData[];
}

export type {
  PostData,
  ResponsePostData,
  ResponsePostDataPlus,
  ResponsePostDataWithComment,
  CommentData,
};
