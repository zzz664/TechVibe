"use client";
import { Spinner } from "@/components/ui";
import dynamic from "next/dynamic";
export const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 text-muted-foreground">
          <Spinner />
          에디터를 로딩중입니다...
        </div>
      </div>
    );
  },
});
