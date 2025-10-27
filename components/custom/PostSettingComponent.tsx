"use client";

import { Button, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Separator, Skeleton } from "@/components/ui";
import { POST_CATEGORY } from "@/constants/category.constant";
import { Asterisk, Trash } from "lucide-react";
import { FileUpload } from "../common";

type Props = {
  thumbnail: File | string | null;
  setMainCategory: React.Dispatch<React.SetStateAction<string>>;
  setSubCategory: React.Dispatch<React.SetStateAction<string>>;
  setThumbnail: React.Dispatch<React.SetStateAction<File | string | null>>;
}

function PostSettingComponent(props: Props) {
  return (
    <section className="h-full w-1/4 flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="text-rose-500/80 font-semibold">STEP.2</span>
        <span className="text-[18px] font-semibold">카테고리 및 썸네일 설정</span>
        <Separator className="mt-6" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">카테고리</Label>
        </div>
        <Select onValueChange={ (value) => {
          props.setSubCategory(value);
          POST_CATEGORY.forEach((item) => {
            if (item.sub_category === value) {
              props.setMainCategory(item.main_category);
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
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Asterisk size={14} className="text-orange-400" />
          <Label className="text-muted-foreground">썸네일</Label>
        </div>
        <FileUpload thumbnail={props.thumbnail} setThumbnail={props.setThumbnail}/>
        <Button variant={"outline"} className="border-0">
          <Trash />
          썸네일 제거
        </Button>
      </div>
    </section>
  );
}

export { PostSettingComponent };