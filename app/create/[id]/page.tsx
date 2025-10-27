import { PostCreateComponent } from "@/components/custom";

export default async function Home({ params }: { params: { id: string }}) {
  {/*params가 thenable(이 상태에선 undefined로 나옴)일 수 있으므로 타입을 명시하여 await를 사용*/}
  const { id } = await params as { id: string };
  
  return (
    <main className="w-full h-full min-h-[1024px] flex gap-6 p-6">
      {/*이 부분도 마찬가지로 string타입을 명시하여 await로 감싸줌*/}
      <PostCreateComponent id={await id as string}/>
    </main>
  );
}