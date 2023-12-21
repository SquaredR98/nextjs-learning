import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippets.findMany();

  const renderedSnippets = snippets.map((snippet, idx) => (
    <div
      key={idx}
      className="flex justify-between items-center p-2 border rounded bg-slate-200 hover:bg-slate-200/70"
    >
      <div className="text-xl font-bold">{snippet.title}</div>
      <Link
        href={`/snippets/${snippet.id}`}
        className="font-medium hover:text-blue-500"
      >
        View Snippet
      </Link>
    </div>
  ));

  return (
    <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
      <div className="my-4 flex justify-between">
        <h1 className="text-2xl font-bold">Snippets</h1>
        <Link
          href="/snippets/new"
          className="bg-blue-200 hover:bg-blue-200/80 flex items-center justify-center px-4 rounded border border-black/40"
        >
          Create a Snippet
        </Link>
      </div>
      <div className="my-2 flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
