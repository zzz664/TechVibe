import { create } from "zustand";

interface AuthStore {
  id: string;
  nickname: string;

  setId: (id: string) => void;
  setNickname: (nickname: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  id: "",
  nickname: "",
  setNickname: (nickname: string) => set(() => ({nickname})),
  setId: (id: string) => set(() => ({id})),
}));