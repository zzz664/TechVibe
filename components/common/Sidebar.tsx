import { ChevronDown } from "lucide-react";
import { MAIN_CATEGORYS, SUB_CATEGORYS } from "@/constants/category.constant";
import { Button, Label } from "../ui";
import Link from "next/link";

function Sidebar() {
  return (
    <aside className="hidden lg:min-w-60 lg:w-60 lg:flex lg:flex-col lg:gap-6">
      <div className="flex items-center gap-2">
        <h4 className="scroll-m-20 text-xl font-extrabold tracking-tight">
          게시글 카테고리
        </h4>
        <ChevronDown className="mt-1" />
      </div>
      <div className="w-full flex flex-col gap-2">
        {MAIN_CATEGORYS.map((main_item) => {
          return (
            <div key={main_item.id} className="w-full flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {main_item.icon}
                <Label className="text-base font-extrabold">
                  {main_item.label}
                </Label>
              </div>
              {SUB_CATEGORYS.map((sub_item) => {
                if (sub_item.main_category === main_item.category) {
                  return (
                    <Button
                      key={sub_item.id}
                      variant={"ghost"}
                      className="text-sm flex items-center justify-start text-muted-foreground hover:text-white hover:pl-6 transition-all duration-500"
                      asChild
                    >
                      <Link href={`/post?category=${sub_item.sub_category}`}>
                        {sub_item.icon}
                        {sub_item.label.toUpperCase()}
                      </Link>
                    </Button>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export { Sidebar };
