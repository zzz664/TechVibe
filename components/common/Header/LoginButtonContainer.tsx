"use client";

import { Button } from "@/components/ui";

function LoginButtonContainer() {
  return (
    <Button
      onClick={() => {
        window.location.replace("/login");
      }}
      variant={"ghost"}
      className="prevent-drag font-semibold text-muted-foreground hover:text-white transition-all duration-500"
    >
      로그인
    </Button>
  );
}

export { LoginButtonContainer };
