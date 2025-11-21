import { Skeleton, Spinner } from "@/components/ui";

function PostListSkeleton({ content }: { content: string }) {
  return (
    <Skeleton className="flex justify-center items-center w-full min-h-70 gap-4 font-semibold text-xl">
      <Spinner className="w-8 h-8 sm:w-12 sm:h-12" />
      {content}
    </Skeleton>
  );
}

export { PostListSkeleton };
