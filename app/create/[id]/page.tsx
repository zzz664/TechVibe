import { PostCreateComponent } from "@/components/custom";

export default async function Home() {
  return (
    <main className="w-full h-full min-h-[1024px] flex gap-6 p-6">
      <PostCreateComponent/>
    </main>
  );
}