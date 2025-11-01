"use client";

import { Input } from "@/components/ui";
import { useEffect } from "react";
import { usePostStore } from "@/stores";

type Props = {
  initial_title: string;
};

function TitleInput({ initial_title }: Props) {
  const { setTitle } = usePostStore();

  useEffect(() => {
    setTitle(initial_title);
  }, [initial_title, setTitle]);
  
  return (
    <Input placeholder="제목을 입력하세요." 
    defaultValue={initial_title} 
    onChange={ e => {
      setTitle(e.target.value);
    }} 
    className="h-12 pl-6 text-lg! placeholder:text-lg! placeholder:font-semibold border-0" 
    />
  );
}

export { TitleInput };