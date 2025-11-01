import { PostData } from "@/model";
import { Block } from "@blocknote/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  isAuth: boolean;
  id: string;
  nickname: string;
}

interface AuthStore {
  user_info: UserInfo;

  setUser: (newUserInfo: UserInfo) => void;
  resetUser: () => void;
}

type PostDataWithoutId = Omit<PostData, "id">;

interface PostStore {
  postData: PostDataWithoutId;
  setTitle: (title: string) => void;
  setContent: (content: Block[]) => void;
  setMainCategory: (main_category: string) => void;
  setSubCategory: (sub_category: string) => void;
  setThumbnail: (thumbnail: File | string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user_info: {
        isAuth: false,
        id: "",
        nickname: "",
      },
      setUser: (newUserInfo: UserInfo) => set(() => ({ user_info: newUserInfo })),
      resetUser: () => set(() => ({ user_info: { isAuth: false, id: "", nickname: "" } })),
    }),
    { name: "auth-storage", }
  ),
)

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      postData: {
        title: null,
        content: null,
        main_category: null,
        sub_category: null,
        thumbnail: null
      },
      setTitle: (new_title: string) => {
        set((prev) => ({ postData: { ...prev.postData, title: new_title } }));
      },
      setContent: (new_content: Block[]) => {
        set((prev) => ({ postData: { ...prev.postData, content: new_content } }));
      },
      setMainCategory: (new_main_category: string) => {
        set((prev) => ({ postData: { ...prev.postData, main_category: new_main_category } }));
      },
      setSubCategory: (new_sub_category: string) => {
        set((prev) => ({ postData: { ...prev.postData, sub_category: new_sub_category } }));
      },
      setThumbnail: (new_thumbnail: File | string | null) => {
        set((prev) => ({ postData: { ...prev.postData, thumbnail: new_thumbnail } }));
      },
    }), 
    { name: "post-storage", }
  ),
);