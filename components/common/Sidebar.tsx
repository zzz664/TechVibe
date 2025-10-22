import { ChevronDown } from "lucide-react";
import { INSIGHT_CATEGORY } from "@/constants/category.constant";
import { Button } from "../ui/button";

function Sidebar() {
  return (
    <aside className="min-w-60 w-60 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <h4 className="scroll-m-20 text-xl font-extrabold tracking-tight">주제 카테고리</h4>
        <ChevronDown className="mt-1" />
      </div>
      <div className="w-full flex flex-col gap-2">
        {INSIGHT_CATEGORY.map((menu) => {
          return (
            <Button key={menu.id} variant={"ghost"} className="justify-start text-muted-foreground hover:text-white hover:pl-6 transition-all duration-500">
              {menu.icon}
              {menu.label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export { Sidebar };