import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function ControlButtonContainer({ children }: Props) {
  return <div className="absolute top-7 left-7 z-9 flex gap-2">{children}</div>;
}

export { ControlButtonContainer };
