import { Skeleton } from "../ui/skeleton";

function SkeletonNewSubject() {
  return(
    <div className="w-full flex flex-col gap-2">
      <Skeleton className="w-full h-[210px]"/>
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full"/>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-60 h-3"/>
          <Skeleton className="w-40 h-[14px]"/>
        </div>
      </div>
    </div>
  );
}

export {SkeletonNewSubject}