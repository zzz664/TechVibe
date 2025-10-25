import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: string;
  nickname: string;
}

interface AuthStore {
  user_info: UserInfo;

  setUser: (newUserInfo: UserInfo) => void;
  resetUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user_info: {
        id: "",
        nickname: "",
      },
      setUser: (newUserInfo: UserInfo) => set(() => ({ user_info: newUserInfo})),
      resetUser: () => set(() => ({user_info : { id: "", nickname: "" }})),
    }), 
    { name: "auth-storage", }
  ),
)