interface PostData {
  title: string;
  content: string;
  main_category: string;
  sub_category: string;
  thumbnail: File | string | null;
}

export type { PostData };