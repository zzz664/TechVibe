"use client";

import { Input } from "@/components/ui";
import { useEffect } from "react";
import { usePostStore } from "@/stores";

type Props = {
  initial_title: string;
};

function TitleInput({ initial_title }: Props) {
  const { postData, setTitle } = usePostStore();

  useEffect(() => {
    setTitle(initial_title ?? undefined);
  }, []);
  
  return (
    <Input placeholder="제목을 입력하세요." 
    value={postData.title as string} 
    onChange={ e => {
      setTitle(e.target.value);
    }} 
    className="h-12 pl-6 text-lg! placeholder:text-lg! placeholder:font-semibold border-0" 
    />
  );
}

export { TitleInput };