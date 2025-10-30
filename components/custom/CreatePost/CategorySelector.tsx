"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { POST_CATEGORY } from "@/constants/category.constant";

type Props = {
  sub_category: string;
  setMainCategory: React.Dispatch<React.SetStateAction<string>>;
  setSubCategory: React.Dispatch<React.SetStateAction<string>>;
}

function CategorySelector({ sub_category, setMainCategory, setSubCategory }: Props) {
  console.log("CategorySelector");
  return (
    <Select value={sub_category} onValueChange={(value) => {
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