import { Sidebar } from "@/components/common";
import { PostCard } from "@/components/custom";
import { fetchPublishPostByCat } from "./action";
import { ResponsePostDataPlus } from "@/model";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  const res = await fetchPublishPostByCat(category);

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col gap-6 p-6">
      <section className="w-full flex gap-4">
        <Sidebar />
        {res.fetch_data && res.fetch_data.length > 0 ? (
          <div className="w-full h-85 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {res.fetch_data.map((data: ResponsePostDataPlus) => {
              return (
                <Link key={data.id} href={`/post/${data.id}`}>
                  <PostCard
                    post_data={data}
                    nickname={data.user.nickname}
                    comment_count={data.comment[0].count}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full min-h-140 flex items-center justify-center text-muted-foreground">
            해당 카테고리에 발행 된 게시글이 존재하지 않습니다.
          </div>
        )}
      </section>
    </main>
  );
}
