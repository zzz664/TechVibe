"use client";

import { useEffect, useRef } from "react";
import { Button, Input } from "../../ui";
import Image from "next/image";
import { ImageUp, Trash } from "lucide-react";
import { usePostStore } from "@/stores";
import { DEFAULT_THUMBNAIL_URL } from "@/constants/thumbnail.constant";

type Props = {
  initial_thumbnail: string | null;
};

function ThumnailSelector({ initial_thumbnail }: Props) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { postData, setThumbnail } = usePostStore();

  useEffect(() => {
    setThumbnail(initial_thumbnail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviewThumbnail = () => {
    if (typeof postData.thumbnail === "string") {
      return (
        <div className="relative w-full aspect-video">
          <Image
            src={postData.thumbnail as string}
            alt={"@THUMBNAIL"}
            priority
            sizes="100em"
            fill
            className="rounded-lg object-cover border"
          />
        </div>
      );
    } else if (postData.thumbnail instanceof File) {
      return (
        <div className="relative w-full aspect-video">
          <Image
            src={URL.createObjectURL(postData.thumbnail as File)}
            alt={"@THUMBNAIL"}
            priority
            sizes="100em"
            fill
            className="rounded-lg object-cover border"
          />
        </div>
      );
    }
    return (
      <div className="w-full flex items-center justify-center aspect-video bg-card/50 rounded-lg">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => fileInput.current?.click()}
        >
          <ImageUp />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {handlePreviewThumbnail()}
      <Input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setThumbnail(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
        className="hidden"
      />
      <Button
        variant={"outline"}
        className="border-0"
        onClick={() => {
          if (postData.sub_category) {
            const thumbnail_src =
              DEFAULT_THUMBNAIL_URL + postData.sub_category + "_default.webp";
            setThumbnail(thumbnail_src);
          }
        }}
      >
        <ImageUp />
        카테고리 기본 썸네일 사용
      </Button>
      <Button
        variant={"outline"}
        className="border-0"
        onClick={() => setThumbnail(null)}
      >
        <Trash />
        썸네일 제거
      </Button>
    </div>
  );
}

export { ThumnailSelector };
