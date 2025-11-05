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

interface LikeData {
  id: string;
  created_at: string;
  post_id: string;
  user_id: string;
  status: boolean;
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
  like: [{ count: number }];
}

interface ResponsePostDataDetail extends ResponsePostData {
  comment: CommentData[];
  like: LikeData[];
}

export type {
  PostData,
  ResponsePostData,
  ResponsePostDataPlus,
  ResponsePostDataDetail,
  CommentData,
  LikeData,
};
