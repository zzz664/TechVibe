"use client";

import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant={"outline"} size={"icon"}>
      <ArrowLeft />
    </Button>
  );
}

export { BackButton };
