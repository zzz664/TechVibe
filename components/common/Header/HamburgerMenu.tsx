"use client";

import { Label, Separator } from "@/components/ui";
import { MAIN_CATEGORYS, SUB_CATEGORYS } from "@/constants/category.constant";
import { FileText, NotebookTabs } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

function HamburgerMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
          if (!hasInteracted) setHasInteracted(true);
        }}
        className="lg:hidden relative w-10 h-10 hover:bg-accent/70 rounded-sm cursor-pointer z-50"
      >
        <div
          className={`absolute bg-white w-8 h-1 top-2 left-1 border rounded-full transition-all duration-100 ${
            open ? "animate-top-open" : hasInteracted ? "animate-top-close" : ""
          }`}
        />
        <div
          className={`absolute bg-white w-8 h-1 top-4.5 left-1 border rounded-full transition-all duration-100 ${
            open ? "animate-mid-open" : hasInteracted ? "animate-mid-close" : ""
          }`}
        />
        <div
          className={`absolute bg-white w-8 h-1 top-7 left-1 border rounded-full transition-all duration-100 ${
            open ? "animate-bot-open" : hasInteracted ? "animate-bot-close" : ""
          }`}
        />
      </div>
      <aside
        className={`lg:hidden fixed overflow-y-scroll top-0 -left-60 w-60 h-full bg-neutral-900 z-45 transition-all ease-in-out duration-500 ${
          open ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-5 pt-17">
          <Link
            href={"/post"}
            className="w-full h-10 flex items-center gap-2 text-muted-foreground hover:bg-accent hover:pl-4 hover:text-white transition-all duration-300 rounded-sm"
            onClick={() => {
              setOpen(false);
            }}
          >
            <NotebookTabs />
            <p className="font-semibold">전체 게시글</p>
          </Link>
          <Separator />
          {MAIN_CATEGORYS.map((main_item) => {
            return (
              <div key={main_item.id} className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-2 pb-2">
                  {main_item.icon}
                  <Label className="text-base font-extrabold">
                    {main_item.label}
                  </Label>
                </div>
                <Separator />
                {SUB_CATEGORYS.map((sub_item) => {
                  if (sub_item.main_category === main_item.category) {
                    return (
                      <Fragment key={sub_item.id}>
                        <Link
                          href={`/post?category=${sub_item.sub_category}`}
                          className="flex items-center gap-2 w-full h-10 text-muted-foreground hover:bg-accent hover:pl-4 hover:text-white transition-all duration-300 rounded-sm"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <FileText size={16} />
                          <p className="font-semibold text-xs">
                            {sub_item.label.toUpperCase()}
                          </p>
                        </Link>
                        <Separator />
                      </Fragment>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </aside>
      {open ? (
        <div
          className="lg:hidden fixed top-0 left-0 z-40 w-full h-full bg-background/30 backdrop-blur-[2px]"
          onClick={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

export { HamburgerMenu };
