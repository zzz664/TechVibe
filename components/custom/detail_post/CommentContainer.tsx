import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function CommentContainer({ children }: Props) {
  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <h3 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight">
        댓글
      </h3>
      {children}
    </div>
  );
}

export { CommentContainer };
