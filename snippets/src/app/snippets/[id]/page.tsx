import React from "react";
import { db } from "../../../db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteSnippet } from "../../../actions";

interface ISnippetShowProps {
  params: {
    id: string;
  };
}

export default async function ShowSnippet(props: ISnippetShowProps) {
  const { id } = props.params;
  const snippet = await db.snippets.findFirst({ where: { id } });
  if (!snippet) {
    return notFound();
  }

  const deleteSinppetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="bg-blue-200 hover:bg-blue-200/70 border border-black/40 px-4 py-1 rounded"
          >
            Edit
          </Link>
          <form action={deleteSinppetAction}>
            <button className="bg-blue-200 hover:bg-blue-200/70 border border-black/40 px-4 py-1 rounded">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="border border-bg-gray-200 bg-gray-200 p-2 rounded">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippets.findMany();

  return snippets.map((snippet) => ({ id: snippet.id }));
}
