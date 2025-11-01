"use client";

import { Input } from "@/components/ui";
import { useEffect } from "react";
import { usePostStore } from "@/stores";
import { useDebouncing } from "@/hooks/useDebouncing";

type Props = {
  initial_title: string;
};

function TitleInput({ initial_title }: Props) {
  const { setTitle } = usePostStore();

  const debounceChange = useDebouncing((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, 250, [setTitle]);

  useEffect(() => {
    setTitle(initial_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input placeholder="제목을 입력하세요." 
    defaultValue={initial_title} 
    onChange={ debounceChange } 
    className="h-12 pl-6 text-lg! placeholder:text-lg! placeholder:font-semibold border-0" 
    />
  );
}

export { TitleInput };