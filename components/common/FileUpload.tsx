"use client";

import { useRef } from "react";
import { Button, Input } from "../ui";
import Image from "next/image";
import { ImageUp } from "lucide-react";

type Props = {
  thumbnail: File | string | null;
  setThumbnail: React.Dispatch<React.SetStateAction<File | string | null>>;
};

function FileUpload(props: Props) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handlePreviewThumbnail = () => {
    if(typeof props.thumbnail === "string") {
      return <Image src={props.thumbnail} alt={"@THUMBNAIL"} width={1} height={1} className="w-full aspect-video rounded-lg object-cover border"/>
    } else if (props.thumbnail instanceof File) {
      return <Image src={URL.createObjectURL(props.thumbnail as File)} alt={"@THUMBNAIL"} width={1} height={1} className="w-full aspect-video rounded-lg object-cover border"/>
    }
    return (
      <div className="w-full flex items-center justify-center aspect-video bg-card/50 rounded-lg">
        <Button size={"icon"} variant={"ghost"} onClick={() => fileInput.current?.click()}>
          <ImageUp/>
        </Button>
      </div>
    );
  }

  return (
    <div>
      { handlePreviewThumbnail() }
      <Input type="file" accept="image/*" ref={fileInput} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
        props.setThumbnail(e.target.files?.[0] ?? null);
        e.target.value = "";
      }} className="hidden"/>
    </div>
  );
}

export { FileUpload };