"use client";

import { useEffect, useRef } from "react";
import { Button, Input } from "../../ui";
import Image from "next/image";
import { ImageUp, Trash } from "lucide-react";
import { usePostStore } from "@/stores";

type Props = {
  initial_thumbnail: string | null;
};

function ThumnailSelector({ initial_thumbnail }: Props) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { postData, setThumbnail } = usePostStore();

  useEffect(() => {
    setThumbnail(initial_thumbnail);
  }, []);

  const handlePreviewThumbnail = () => {
    if (typeof postData.thumbnail === "string") {
      return <Image src={postData.thumbnail} alt={"@THUMBNAIL"} width={100} height={100} className="w-full aspect-video rounded-lg object-cover border" />
    } else if (postData.thumbnail instanceof File) {
      return <Image src={URL.createObjectURL(postData.thumbnail as File)} alt={"@THUMBNAIL"} width={100} height={100} className="w-full aspect-video rounded-lg object-cover border" />
    }
    return (
      <div className="w-full flex items-center justify-center aspect-video bg-card/50 rounded-lg">
        <Button size={"icon"} variant={"ghost"} onClick={() => fileInput.current?.click()}>
          <ImageUp />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {handlePreviewThumbnail()}
      <Input type="file" accept="image/*" ref={fileInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setThumbnail(e.target.files?.[0] ?? null);
        e.target.value = "";
      }} className="hidden" />
      <Button variant={"outline"} className="border-0" onClick={() => setThumbnail(null)}>
        <Trash />
        썸네일 제거
      </Button>
    </div>
  );
}

export { ThumnailSelector };