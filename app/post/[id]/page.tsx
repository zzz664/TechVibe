import { Editor } from "@/components/common";
import { Separator } from "@/components/ui";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = (await params) as { id: string };
  return (
    <main className="w-full h-full min-h-[720px] flex flex-col gap-6">
      {/*썸네일*/}
      <div className="relative w-full h-100 bg-cover bg-accent">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <section className="relative w-full flex flex-col items-center justify-center gap-2 -mt-50">
        <p className="mb-4 text-muted-foreground">카테고리</p>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          좀 있어보이는 긴 제목
        </h1>
        <Separator className="w-10! my-4 bg-foreground border-2 rounded-xl" />
        <p>2025.11.03</p>
      </section>
      <Editor readonly />
    </main>
  );
}
