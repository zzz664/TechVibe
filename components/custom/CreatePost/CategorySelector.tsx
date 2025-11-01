"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { POST_CATEGORY } from "@/constants/category.constant";
import { usePostStore } from "@/stores";
import { useEffect } from "react";

type Props = {
  initial_main_category: string;
  initial_sub_category: string;
}

function CategorySelector({ initial_main_category, initial_sub_category }: Props) {
  const { setMainCategory, setSubCategory } = usePostStore();
  
  useEffect(() => {
    setMainCategory(initial_main_category);
    setSubCategory(initial_sub_category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select defaultValue={initial_sub_category} onValueChange={(value) => {
      setSubCategory(value);
      POST_CATEGORY.forEach((item) => {
        if (item.sub_category === value) {
          setMainCategory(item.main_category);
          return;
        }
      });
    }}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="카테고리를 선택하세요." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리</SelectLabel>
          {POST_CATEGORY.map((item) => {
            return (
              <SelectItem key={item.id} value={item.sub_category}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { CategorySelector };