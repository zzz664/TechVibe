export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;

  return <div>카테고리 : {category ? category : "전체 게시글"}</div>;
}
